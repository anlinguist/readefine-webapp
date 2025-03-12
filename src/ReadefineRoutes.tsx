/*global browser*/
/*global chrome*/
import { useContext, useEffect } from 'react'
import routes from './routes';
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { RDFNContext } from './RDFNContext';
import Footer from './components/Footer/Footer';
import * as FullStory from '@fullstory/browser';
import default_photo from './assets/def_prof_pic.jpeg'
import usePrevious from './components/usePrevious';
import { useAuth } from './contexts/AuthContext';
import { NavbarMinimal } from './components/Navigation/NavBarMinimal';
import { ModalsProvider } from "@mantine/modals";
import AddReadefinition from './components/Modals/AddReadefinition';
import NewDictionary from './components/Modals/NewDictionary';
import EditReadefinition from './components/Modals/EditReadefinition';
import MarketingModal from './components/Modals/MarketingModal';
import Settings from './components/Modals/Settings';
import UploadReadefinitions from './components/Modals/UploadReadefinitions';
import CreateNewAIStyle from './components/Modals/CreateNewAIStyle';
import CreateNewAITarget from './components/Modals/CreateNewAITarget';
import RequestConversion from './components/Modals/RequestConversion';

const ProtectedRoute = ({
  redirectPath = '/',
  children
}: any) => {
  const { user, loading } = useAuth();
  if (loading) {
    return
  }
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

function ReadefineRoutes() {
  // @ts-expect-error TS(2339): Property 'createDownloadLink' does not exist on ty... Remove this comment to see the full error message
  const { createDownloadLink, dictionaryType, isSuperAdmin, loadingUserData, setAIPromptOptions, setDictionaryContent, setDictLoading, setDomains, setProStatus, setIsSuperAdmin, setShowedMarketingModal, showedMarketingModal, setLoadingUserData, setUserCount, setUserName, setUserPhoto, setReadefineMarketingEmailsSet, setReadefineMarketingEmails, setProPaymentSystem, setConversionCategories, setAllConversions, setEnabledConversions, updateUserProfileData } = useContext(RDFNContext);
  const { user, loading, makeRdfnRequest } = useAuth();
  const prevDictionaryType = usePrevious(dictionaryType);
  const location = useLocation();
  const navigate = useNavigate();

  const fetch_data = async () => {
    setDictLoading(true)
    setDictionaryContent([])

    try {
      const path = '/user/details';
      const response = await makeRdfnRequest(path, 'GET', {}, null);
      if (!response.ok) {
        setLoadingUserData(false);
        return;
      }
      const data = await response.json();

      await updateUserProfileData(data);

    } catch (err) {
      console.log(err)
      setLoadingUserData(false);
      navigate("/error")
    }
  }

  useEffect(() => {
    if (loading) return;
    if (user) {
      FullStory.identify(user?.uid, {
        displayName: user?.displayName || "",
        email: user?.email || "",
      });
      if ((window as any).readefine) {
        (window as any).readefine.turnOff();
        (window as any).readefine = null;
      }
      setUserPhoto(user?.photoURL ? user?.photoURL : default_photo);
      setUserName(user?.displayName ? user?.displayName : user?.email);
      fetch_data();
    }
    else {
      const allowedPaths = ['/', '/learn', '/about', '/uninstall'];
      const locationPath = location.pathname;
      setLoadingUserData(false);
      if (locationPath === '/welcome') {
        navigate(`/learn`);
      } else if (allowedPaths.includes(locationPath)) {
        return;
      }
      else {
        navigate('/');
      }
    }
  }, [user, loading]);

  useEffect(() => {
    if (prevDictionaryType !== '' && dictionaryType === 'user' && user) {
      fetch_data();
    }
  }, [dictionaryType, user]);

  return (
    <>
      {
        !loadingUserData &&
        <>
          <NavbarMinimal />
          <div id='routeContainer'>
            <Routes>
              {
                routes.map(({ path, Component, protectedRoute }, index) => {
                  const element = protectedRoute ? (
                    <ProtectedRoute>
                      <ModalsProvider
                        modals={{
                          "add-readefinition": AddReadefinition,
                          "new-dictionary": NewDictionary,
                          "edit-readefinition": EditReadefinition,
                          "marketing": MarketingModal,
                          "settings": Settings,
                          "upload-readefinitions": UploadReadefinitions,
                          "add-new-style": CreateNewAIStyle,
                          "add-new-target": CreateNewAITarget,
                          "request-conversion": RequestConversion
                        }}
                      >
                        <Component />
                      </ModalsProvider>
                    </ProtectedRoute>
                  ) : (
                    <ModalsProvider
                    modals={{
                      "settings": Settings,
                      "marketing": MarketingModal,
                    }}
                  >
                    <Component />
                  </ModalsProvider>
                  );
                  return (
                    <Route key={index} path={path} element={element} />
                  )
                })
              }
            </Routes>
            <Footer />
          </div>
        </>
      }
      {
        loadingUserData &&
        <div id='loadingUserData'>
          <div className="loading"></div>
        </div>
      }
    </>
  )
}

export default ReadefineRoutes