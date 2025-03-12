/*global browser*/
/*global chrome*/
import { useEffect } from 'react';
import FirebaseUI from '../../../services/firebaseUI';
import { useAuth } from '../../../contexts/AuthContext';

const OBLogin = ({
  currentStep,
  goTo,
  access,
  setBlockNext
}: any) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    setBlockNext(true);
    if (!access) {
      console.log('going to first ob flow')
      goTo(1)
    }
    else {
      if (user) {
        setBlockNext(false);
        goTo(3)
      }
    }
  }, [user, loading, goTo, access]);

  if (currentStep !== 2) {
    return null;
  }

  return (
    <>
      {!loading &&
        <>
          <div className='rdfn-onboarding-desc-wider'>
            <h3 className='rdfn-onboarding-step-title'>Next, sign in with Google, Apple, or your own email address.</h3>
            <FirebaseUI />
          </div>
        </>
      }
    </>
  );
};

export default OBLogin