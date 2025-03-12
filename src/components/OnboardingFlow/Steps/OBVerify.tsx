/*global browser*/
/*global chrome*/
import { Alert, Button, Group, Text } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useCallback, useState } from 'react'
import { useEffect } from 'react';

const OBVerify = ({
  currentStep,
  goTo,
  grantAccess
}: any) => {
  const [addtobrowserbtnvalue, setAddtobrowserbtnvalue] = useState(''),
    [addtobrowserbtnlink, setAddtobrowserbtnlink] = useState('');
  const testForReadefine = useCallback(async () => {
    // @ts-expect-error TS(2304): Cannot find name 'InstallTrigger'.
    var isFirefox = typeof InstallTrigger !== 'undefined' || navigator.userAgent.toLowerCase().includes('firefox');
    // @ts-expect-error TS(2345): Argument of type '{ new (): HTMLElement; prototype... Remove this comment to see the full error message
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    var isIOS = iOS() && !navigator.userAgent.includes("CriOS")
    function iOS() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
    // Chrome 1 - 79
    var isChrome = !!(window as any).chrome && (!isIOS);

    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") !== -1);
    let response;
    try {
      if (isSafari || isIOS) {
        // @ts-expect-error TS(2304): Cannot find name 'browser'.
        response = await browser.runtime.sendMessage("com.getreadefine.readefine.Extension (QK39SRR4H5)", { checkReadefineWithPermissions: true })
        if (!response) {
          if (isIOS) {
            setAddtobrowserbtnvalue('Add to iOS');
            setAddtobrowserbtnlink('https://apps.apple.com/us/app/readefine/id1544832207');
          }
          else {
            setAddtobrowserbtnvalue('Add to Safari');
            setAddtobrowserbtnlink('https://apps.apple.com/us/app/readefine/id1544832207');
          }
          setTimeout(() => {
            testForReadefine();
            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
          }, "1000")
        }
        else {
          grantAccess()
          goTo(2)
        }
      }
      else if (isFirefox) {
        if (document.querySelector('#readefineextension')) {
          grantAccess()
          goTo(2)
        }
        else {
          setAddtobrowserbtnvalue('Add to Firefox');
          setAddtobrowserbtnlink('https://addons.mozilla.org/en-US/firefox/addon/readefine-simplify-websites/');
          setTimeout(() => {
            testForReadefine();
            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
          }, "1000")
        }
      }
      else {
        let ext_id;
        if (isEdgeChromium) {
          ext_id = 'cglfmmemieddkpolaaeckmbnaddjbbfe'
        }
        else {
          ext_id = 'odfcpcabgcopkkpicbnebpefigppfglm'
        }
        let sent = false
        chrome.runtime.sendMessage(ext_id, { checkReadefineWithPermissions: true }, function (response: any) {
          sent = true
          if (!response) {
            if (!isEdgeChromium) {
              setAddtobrowserbtnvalue('Add to Chrome');
              setAddtobrowserbtnlink('https://chrome.google.com/webstore/detail/readefine-simplify-websit/odfcpcabgcopkkpicbnebpefigppfglm');
            }
            else {
              setAddtobrowserbtnvalue('Add to Edge');
              setAddtobrowserbtnlink('https://microsoftedge.microsoft.com/addons/detail/readefine-simplify-webs/cglfmmemieddkpolaaeckmbnaddjbbfe');
            }
            setTimeout(() => {
              testForReadefine();
              // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            }, "1000")
          }
          else {
            grantAccess()
            goTo(2)
          }
        })
        if (!sent) {
          setAddtobrowserbtnvalue('Add to Chrome');
          setAddtobrowserbtnlink('https://chrome.google.com/webstore/detail/readefine-simplify-websit/odfcpcabgcopkkpicbnebpefigppfglm');
        }
      }
    }
    catch (e) {
      if (isSafari || isIOS) {
        if (isIOS) {
          setAddtobrowserbtnvalue('Add to iOS');
          setAddtobrowserbtnlink('https://apps.apple.com/us/app/readefine/id1544832207');
        }
        else {
          setAddtobrowserbtnvalue('Add to Safari');
          setAddtobrowserbtnlink('https://apps.apple.com/us/app/readefine/id1544832207');
        }
      }
      else if (isFirefox) {
        setAddtobrowserbtnvalue('Add to Firefox');
        setAddtobrowserbtnlink('https://addons.mozilla.org/en-US/firefox/addon/readefine-simplify-websites/');
      }
      else {
        if (!isEdgeChromium) {
          setAddtobrowserbtnvalue('Add to Chrome');
          setAddtobrowserbtnlink('https://chrome.google.com/webstore/detail/readefine-simplify-websit/odfcpcabgcopkkpicbnebpefigppfglm');
        }
        else {
          setAddtobrowserbtnvalue('Add to Edge');
          setAddtobrowserbtnlink('https://microsoftedge.microsoft.com/addons/detail/readefine-simplify-webs/cglfmmemieddkpolaaeckmbnaddjbbfe');
        }
      }
      setTimeout(() => {
        testForReadefine();
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      }, "1000")
    }
  }, [goTo, grantAccess])
  useEffect(() => {
    testForReadefine()
  }, [testForReadefine])

  if (currentStep !== 1) {
    return null;
  }

  useEffect(() => {
    testForReadefine()
  }, [testForReadefine])

  return (
    <div id="section1">
      <Alert color="rdfnyellow.6" m={"20px 0"}>
        <Group justify='center' gap="xs" align="center">
          <IconExclamationCircle size={24} style={{ marginRight: '10px' }} />
          <Text>To get started, you'll need to install Readefine.</Text>
        </Group>
      </Alert>
      {
        <Button m={'0 auto'} autoContrast w={"100%"} maw={"400px"} color="rdfnyellow.6" size="lg" component="a" target="_blank" href={addtobrowserbtnlink}>
          {`${addtobrowserbtnvalue}`}
        </Button>
      }
    </div>
  );
};

export default OBVerify