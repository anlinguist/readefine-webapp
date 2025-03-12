import { getAuth } from "firebase/auth";

export const Logout = () => {
  const auth = getAuth();
  auth.signOut().then(() => {
    console.log("Logged out")
  }).catch((error) => {
    console.log(error)
  });
}