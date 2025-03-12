/*global browser*/
/*global chrome*/
import { useState, useCallback, useEffect } from "react";
import { Button, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import LargeLogo from "../Logo/LargeLogo";
import { ReadefineTooltip } from "../ReadefineTooltipDemo";

function Section1() {
  const navigate = useNavigate();
  const [addtobrowserbtnvalue, setAddtobrowserbtnvalue] = useState(''),
    [addtobrowserbtnlink, setAddtobrowserbtnlink] = useState(''),
    [userInstalled, setUserInstalled] = useState(false)

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
            setAddtobrowserbtnvalue('iOS');
            setAddtobrowserbtnlink('https://apps.apple.com/us/app/readefine/id1544832207');
          }
          else {
            setAddtobrowserbtnvalue('Safari');
            setAddtobrowserbtnlink('https://apps.apple.com/us/app/readefine/id1544832207');
          }
          setTimeout(() => {
            testForReadefine();
            // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
          }, "1000")
        }
        else {
          setUserInstalled(true)
        }
      }
      else if (isFirefox) {
        if (document.querySelector('#readefineextension')) {
          setUserInstalled(true)
        }
        else {
          setAddtobrowserbtnvalue('Firefox');
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
          console.log('sent message...')
          sent = true
          if (!response) {
            if (!isEdgeChromium) {
              console.log('not edge and no response...')
              setAddtobrowserbtnvalue('Chrome');
              setAddtobrowserbtnlink('https://chrome.google.com/webstore/detail/readefine-simplify-websit/odfcpcabgcopkkpicbnebpefigppfglm');
            }
            else {
              setAddtobrowserbtnvalue('Edge');
              setAddtobrowserbtnlink('https://microsoftedge.microsoft.com/addons/detail/readefine-simplify-webs/cglfmmemieddkpolaaeckmbnaddjbbfe');
            }
            setTimeout(() => {
              testForReadefine();
              // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            }, "1000")
          }
          else {
            setUserInstalled(true);
          }
        })
        if (!sent) {
          console.log('not sent...')
          setAddtobrowserbtnvalue('Chrome');
          setAddtobrowserbtnlink('https://chrome.google.com/webstore/detail/readefine-simplify-websit/odfcpcabgcopkkpicbnebpefigppfglm');
        }
      }
    }
    catch (e) {
      if (isSafari || isIOS) {
        if (isIOS) {
          setAddtobrowserbtnvalue('iOS');
          setAddtobrowserbtnlink('https://apps.apple.com/us/app/readefine/id1544832207');
        }
        else {
          setAddtobrowserbtnvalue('Safari');
          setAddtobrowserbtnlink('https://apps.apple.com/us/app/readefine/id1544832207');
        }
      }
      else if (isFirefox) {
        setAddtobrowserbtnvalue('Firefox');
        setAddtobrowserbtnlink('https://addons.mozilla.org/en-US/firefox/addon/readefine-simplify-websites/');
      }
      else {
        if (!isEdgeChromium) {
          setAddtobrowserbtnvalue('Chrome');
          setAddtobrowserbtnlink('https://chrome.google.com/webstore/detail/readefine-simplify-websit/odfcpcabgcopkkpicbnebpefigppfglm');
        }
        else {
          setAddtobrowserbtnvalue('Edge');
          setAddtobrowserbtnlink('https://microsoftedge.microsoft.com/addons/detail/readefine-simplify-webs/cglfmmemieddkpolaaeckmbnaddjbbfe');
        }
      }
      setTimeout(() => {
        testForReadefine();
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      }, "1000")
    }
  }, []);

  const [hoveredData, setHoveredData] = useState([
    {
      original: "Simplify",
      synonyms: ["Convert", "Reword", "Summarize", "Rephrase"],
      target: "Reword",
      type: "main",
      interval: 3000,
    },
    {
      original: "internet",
      synonyms: ["web", "net"],
      target: "web",
      type: "main",
      interval: 2500,
    },
    {
      original: "Install on",
      synonyms: ["Add to", "Get for"],
      target: "Add to",
      type: "main",
      interval: 3200,
    },
    {
      original: "simplify",
      synonyms: ["convert", "reword", "summarize", "rephrase"],
      target: "reword",
      type: "main",
      interval: 3100,
    },
    {
      original: "Leveraging",
      synonyms: ["With", "Using", "Utilizing"],
      target: "Using",
      type: "main",
      interval: 2900,
    },
    {
      original: "suit",
      synonyms: ["work for", "fit", "match"],
      target: "fit",
      type: "main",
      interval: 3300,
    },
    {
      original: "get started",
      synonyms: ["begin", "start", "go"],
      target: "get started",
      type: "main",
      interval: 3400,
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredData((prevData) =>
        prevData.map((item) => {
          // 1) Find current index in synonyms
          const currentIndex = item.synonyms.indexOf(item.target);
          // 2) Determine the next index
          const nextIndex = (currentIndex + 1) % item.synonyms.length;
  
          // 3) Return a new item, but ONLY update the `target`.
          //    We do NOT overwrite `original`, so `original` remains the same.
          return {
            ...item,
            // original: item.original, // (already in the spread)
            target: item.synonyms[nextIndex],
          };
        })
      );
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);
  
  

  useEffect(() => {
    testForReadefine()
  }, [testForReadefine])

  return (
    <Stack justify="space-around" p={"10px"} flex={1}>
      <Stack align="center">
        <LargeLogo />
        <Stack align="center">
          <Title order={2} fw={"bold"}><ReadefineTooltip
              hoveredData={hoveredData[0]}
              readefineMode="reading"
            /> the internet.</Title>
          <Text ta={'center'} size="lg"><ReadefineTooltip
              hoveredData={hoveredData[4]}
              readefineMode="reading"
            /> Readefine, you can <ReadefineTooltip
              hoveredData={hoveredData[3]}
              readefineMode="reading"
            /> the <ReadefineTooltip
            hoveredData={hoveredData[1]}
            readefineMode="reading"
          /> to <ReadefineTooltip
          hoveredData={hoveredData[5]}
          readefineMode="reading"
        /> your needs.</Text>
        </Stack>
      </Stack>
      {
        !userInstalled &&
        <Button m={'0 auto'} autoContrast w={"100%"} maw={"400px"} color="rdfnyellow.6" size="lg" component="a" target="_blank" href={addtobrowserbtnlink}>
          <ReadefineTooltip
              hoveredData={hoveredData[2]}
              readefineMode="reading"
            />&nbsp;{`${addtobrowserbtnvalue}`}
        </Button>
      }
      {
        userInstalled &&
        <Button m={'0 auto'} autoContrast w={"100%"} maw={"400px"} color="rdfnyellow.6" size="lg" onClick={(() => {
          navigate("/learn")
        })}>
          Let's&nbsp;<ReadefineTooltip
            hoveredData={hoveredData[6]}
            readefineMode="reading"
          />
        </Button>
      }
    </Stack>
  )
}

export default Section1