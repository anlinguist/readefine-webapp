import { useState, createContext } from 'react';
import { notifications } from '@mantine/notifications';
import { useAuth } from './contexts/AuthContext';
import { Logout } from './services/logout';
import { openContextModal } from '@mantine/modals';

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
const RDFNContext = createContext();
const RDFNContextProvider = ({
  children
}: any) => {
  const [aiPromptOptions, setAIPromptOptions] = useState({});
  const [chosenAIStyle, setChosenAIStyle] = useState('');
  const [dialect, setDialect] = useState(false);
  const [dictionaryContent, setDictionaryContent] = useState([]);
  const [dictionaryName, setDictionaryName] = useState('');
  const [dictionaryType, setDictionaryType] = useState('');
  const [dictLoading, setDictLoading] = useState(true);
  const [domains, setDomains] = useState({});
  const [downloadLink, setDownloadLink] = useState('');
  const [editable, setEditable] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [HLRDFN, setHLRDFN] = useState(false);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [mode, setMode] = useState('reading');
  const [pdfs, setPdfs] = useState(false);
  const [proPaymentSystem, setProPaymentSystem] = useState(false);
  const [proStatus, setProStatus] = useState(false);
  const [readefineMarketingEmails, setReadefineMarketingEmails] = useState(undefined);
  const [readefineMarketingEmailsSet, setReadefineMarketingEmailsSet] = useState<boolean | undefined>(undefined);
  const [showedMarketingModal, setShowedMarketingModal] = useState(false);
  const [showModal, setShowModal] = useState(undefined);
  const [status, setStatus] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [wordObj, setWordObj] = useState({});
  const { makeRdfnRequest } = useAuth();
  const [conversionCategories, setConversionCategories] = useState([]);
  const [conversionCategoryName, setConversionCategoryName] = useState('');
  const [allConversions, setAllConversions] = useState({});
  const [enabledConversions, setEnabledConversions] = useState({});

  const updateUserProfileData = async (data: any) => {
    let userDictionary = data['readefinePersonalDictionaryV2']
    if (!Array.isArray(userDictionary)) { userDictionary = [] }
    if (userDictionary) {
      userDictionary.sort((a: any, b: any) => a.original.localeCompare(b.original, undefined, { sensitivity: 'base' }))
      setDictionaryContent(userDictionary)
      createDownloadLink(userDictionary)
      setDictLoading(false)
    }
    setUserCount(data['readefinedCount'])
    setMode(data['readefineMode'])
    setDomains({ UDomains: data['readefineAddons'], NUDomains: data['disabledAddons'] })
    data['superAdmin'] ? setIsSuperAdmin(true) : setIsSuperAdmin(false);

    if (data?.includedConversions && data?.excludedConversions) {
      const includedConversionCategories = Object.keys(data.includedConversions);
      const excludedConversionCategories = Object.keys(data.excludedConversions);
      const localConversionCategories: any = Array.from(new Set([...includedConversionCategories, ...excludedConversionCategories]));
      setEnabledConversions(data.includedConversions);
      setConversionCategories(localConversionCategories);

      const allConversions = localConversionCategories.reduce((acc: any = {}, category: any) => {
        const includedConversions = data.includedConversions[category] || {};
        const excludedConversions = data.excludedConversions[category] || {};
        const conversions = {
          ...includedConversions,
          ...excludedConversions
        }
        acc[category] = conversions;

        return acc;
      }, {});
      setAllConversions(allConversions);
    }

    if (data?.readefineAISubscription?.status === "Active" && data?.readefineAISubscription?.tier === "Pro") {
      setProStatus(true)
      if (data?.readefineAISubscription?.paymentSystem) {
        setProPaymentSystem(data?.readefineAISubscription?.paymentSystem)
      }
    } else {
      setProStatus(false)
    }
    if (data['readefineAIOptions']) {
      setAIPromptOptions(data['readefineAIOptions'])
    } else {
      setAIPromptOptions({})
    }

    if (data['readefineMarketingEmails'] === undefined) {
      setReadefineMarketingEmailsSet(false);
      if (!showedMarketingModal) {
          setShowedMarketingModal(true);
          setLoadingUserData(false);
        // if path is not /learn, then openContextModal
        if (window.location.pathname !== '/learn') {

          await new Promise(resolve => setTimeout(resolve, 500));
          openContextModal({
            modal: "marketing",
            title: "Stay Updated!",
            size: "sm",
            centered: true,
            innerProps: {},
          });
        }
        return;
      }
    } else {
      setReadefineMarketingEmailsSet(true);
      setReadefineMarketingEmails(data['readefineMarketingEmails']);
    }

    setLoadingUserData(false);
  }

  const updateStyles = async (styleName: any, method: any, msg: any) => {
    const raw = {
      "style": styleName
    }

    let path = `/user/ai/style`;
    const resp = await makeRdfnRequest(path, method, {}, raw);
    if (resp.status !== 200) {
      const respData = await resp.json();
      showToastMessage(respData['error'], "error");
      return;
    }
    const updatedata = await resp.json();
    setAIPromptOptions(updatedata['updatedAIPromptOptions']);
    showToastMessage(msg, "success");
  };

  const updateTargets = async (targetName: any, method: any, msg: any) => {
    const raw = {
      "style": chosenAIStyle,
      "target": targetName
    };

    const path = `/user/ai/target`
    const resp = await makeRdfnRequest(path, method, {}, raw);
    if (resp.status === 401) {
      Logout();
      return;
    }
    if (resp.status !== 200) {
      const respData = await resp.json();
      showToastMessage(respData['error'], "error");
      return;
    }
    const updatedata = await resp.json();
    setAIPromptOptions(updatedata['updatedAIPromptOptions']);
    showToastMessage(msg, "success");
  };

  const animateScroll = (element: any, to: any, duration: any) => {
    const start = element.scrollTop,
      change = to - start,
      increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = (Math as any).easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  (Math as any).easeInOutQuad = function (t: any, b: any, c: any, d: any) {
    t /= d / 2;
    if (t < 1)
      return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const showToastMessage = (msg: any, status: any) => {
    if (status === 'success') {
      notifications.show({
        position: 'top-right',
        message: msg,
        color: '#587752',
      });
    } else if (status === 'error') {
      notifications.show({
        position: 'top-right',
        title: 'Uh-oh!',
        message: msg,
        color: 'red',
      });
    }
  };

  const createDownloadLink = (dictionary: any) => {
    let output = '';
    for (var i = 0, len = dictionary.length; i < len; i++) {
      output = output + dictionary[i]['original'] + "\t" + dictionary[i]['target'] + "\t" + (dictionary[i]['definition'] ? dictionary[i]['definition'] : '') + "\t" + (dictionary[i]['link'] ? dictionary[i]['link'] : '') + "\n"
    }
    setDownloadLink("data:text/tab-separated-values," + encodeURIComponent(output));
  };

  const contextValues = {
    aiPromptOptions,
    allConversions,
    animateScroll,
    chosenAIStyle,
    createDownloadLink,
    conversionCategories,
    conversionCategoryName,
    dialect,
    dictionaryContent,
    dictionaryName,
    dictionaryType,
    dictLoading,
    domains,
    downloadLink,
    editable,
    enabledConversions,
    HLRDFN,
    isSuperAdmin,
    loadingFailed,
    loadingUserData,
    mode,
    pdfs,
    proStatus,
    proPaymentSystem,
    readefineMarketingEmails,
    readefineMarketingEmailsSet,
    setAIPromptOptions,
    setAllConversions,
    setChosenAIStyle,
    setConversionCategories,
    setConversionCategoryName,
    setDialect,
    setDictionaryContent,
    setDictionaryName,
    setDictionaryType,
    setDictLoading,
    setDomains,
    setDownloadLink,
    setEditable,
    setEnabledConversions,
    setHLRDFN,
    setIsSuperAdmin,
    setLoadingFailed,
    setLoadingUserData,
    setMode,
    setPdfs,
    setProPaymentSystem,
    setProStatus,
    setReadefineMarketingEmails,
    setReadefineMarketingEmailsSet,
    setShowedMarketingModal,
    setShowModal,
    setStatus,
    setUserCount,
    setUserName,
    setUserPhoto,
    setWordObj,
    showedMarketingModal,
    showModal,
    showToastMessage,
    status,
    updateStyles,
    updateTargets,
    updateUserProfileData,
    userCount,
    userName,
    userPhoto,
    wordObj,
  };

  return (
    <RDFNContext.Provider value={contextValues}>
      {children}
    </RDFNContext.Provider>
  );
};

export { RDFNContext, RDFNContextProvider };