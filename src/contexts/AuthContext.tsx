import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import auth from '../services/auth';
import { IS_NEW_EXTENSION, sendToExtension } from '../extensionCompanionUtils';
import { Logout } from '../services/logout';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    getToken: () => Promise<string | undefined>;
    makeRdfnRequest: (path: string, method: string, headers: any, body: any, allowUnauthenticated?: boolean) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, getToken: async () => undefined, makeRdfnRequest: async () => undefined });
export const useAuth = () => useContext(AuthContext);

interface CustomTokenResponse {
    customToken: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const getCustomToken = async (idToken: string): Promise<string> => {
        const path = `/user/generateCustomToken`;
        const customTokenRaw = await makeRdfnRequest(path, 'POST', {}, { idToken });
        const customToken: CustomTokenResponse = await customTokenRaw.json();
        return customToken.customToken;
    }

    const useOTPInExtension = async (user: User, idToken: string): Promise<void> => {
        console.log("USING OTP IN EXTENSION");
        const url = `${import.meta.env.VITE_REACT_APP_RDFN_HOST_OLD_SERVER}/v2/generate-otp`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: idToken,
            }),
        });

        const data = await response.json();
        const extensionData = {
            otp: data.otp,
            gUserName: user.displayName,
            gUserEmail: user.email,
            gUserID: user.uid,
            gUserPhoto: user.photoURL
        }
        sendToExtension(extensionData);
    }

    const useCustomTokenInExtension = async (idToken: string): Promise<void> => {
        console.log("USING CUSTOM TOKEN IN EXTENSION");
        const customToken: string = await getCustomToken(idToken);
        sendToExtension({ type: 'AUTH_MESSAGE', customToken });
    }

    const signUserIntoExtension = async (user: User) => {
        try {
            const idToken = await user.getIdToken();

            if (IS_NEW_EXTENSION()) {
                await useCustomTokenInExtension(idToken);
            } else {
                await useOTPInExtension(user, idToken);
            }
        }
        catch (error) {
            console.error('Error obtaining custom token:', error);
            await signUserOutOfExtension();
        };
    }

    const signUserOutOfExtension = async () => {
        if (IS_NEW_EXTENSION()) {
            sendToExtension({ type: 'AUTH_MESSAGE', signOut: true });
        } else {
            sendToExtension({ signOut: true });
        }
    }

    const getToken = async (): Promise<string | undefined> => {
        if (!user) {
            return;
        }

        const idToken = await user.getIdToken();
        return idToken;
    }

    const makeRdfnRequest = async (path: string, method: string, headers: any, body: any, allowUnauthenticated?: boolean): Promise<any> => {
        if (!user && !allowUnauthenticated) {
            throw new Error('UNAUTHENTICATED_USER');
        }
        try {
            const token = await user?.getIdToken(true) || false;
    
            if (!token && !allowUnauthenticated) {
                Logout();
                return;
            }
    
            const url = `${import.meta.env.VITE_REACT_APP_RDFN_HOST}${path}`;
    
            headers['Content-Type'] = 'application/json';
            headers['Api-Version'] = '2.0';
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
    
            let reqOptions: any = {
                method: method,
                headers: headers
            }
    
            if (method !== 'GET' && body) {
                reqOptions.body = JSON.stringify(body);
            }
    
            const response = await fetch(url, reqOptions);
    
            if (response.status === 401) {
                Logout();
                return;
            }
    
            return response;
        } catch (error) {
            console.error('Error during fetch:', error);
            throw error;
        }
    }

    useEffect(() => {
        if (loading) return;
        if (user) {
            signUserIntoExtension(user);
        } else {
            console.log("SIGNING USER OUT OF EXTENSION");
            signUserOutOfExtension();
        }
    }, [user, loading]);

    return (
        <AuthContext.Provider value={{ user, loading, getToken, makeRdfnRequest }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}