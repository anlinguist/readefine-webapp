/*global readefine_tooltip*/
/* eslint no-multi-str: "off"*/
import { useContext, useEffect } from 'react'
import { Alert, Text, Title } from '@mantine/core';
import { ReadefineTooltip } from '../../ReadefineTooltipDemo.js';
import { RDFNContext } from '../../../RDFNContext.js';
import { openContextModal } from '@mantine/modals';

const OBLearn = (props: any) => {
  // @ts-expect-error TS(2339): Property 'currentStep' does not exist on type 'unknown'.
  const { readefineMarketingEmailsSet } = useContext(RDFNContext);
  const handleClick = (e: any) => {
    if (e.target.closest('#rdfn_def_visible')) {
      var rdfnDefApp = document.getElementById("rdfnDefAppearance");
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      rdfnDefApp.classList.toggle('expanded-rdfn-def');

      var rdfnExpandOut = document.getElementById('rdfn_expand_out');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      rdfnExpandOut.classList.toggle('expanded-rdfn-def');

      var rdfnExpandIn = document.getElementById('rdfn_expand_in');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      rdfnExpandIn.classList.toggle('expanded-rdfn-def');
      return
    }
  }

  // add use effect for click listener to toggle between rdfn_expand_out and rdfn_expand_in
  useEffect(() => {
    document.documentElement.addEventListener('click', handleClick)

    if (!readefineMarketingEmailsSet && readefineMarketingEmailsSet !== undefined) {
      openContextModal({
        modal: "marketing",
        title: "Stay Updated!",
        size: "sm",
        centered: true,
        innerProps: {
          closeOnSelection: true
        },
      });
    }

    return () => {
      document.documentElement.removeEventListener('click', handleClick)
    }
  }, [])

  if (props.currentStep !== 3) {
    return null;
  }

  return (
    <div className='rdfn-onboarding-desc-wider'>
      <Title m={"auto"} ta={'center'} fw={'unset'} mb={'10px'} order={1}>Readefine 101</Title>
      <div style={{
        flex: 1,
      }}>
        <p>You've installed Readefine and signed in - welcome! But...what exactly <b>is</b> Readefine?</p>
        <Alert ta={'center'} variant="light" color="rdfnyellow.6">
          <Text fw={"bold"} size='md'>Readefine is a browser extension that rewords the internet.</Text>
        </Alert>
        <p>When Readefine rewords something, it adds a yellow underline to the updated text. Hover over this 'readefinition' to see the original word or phrase:</p>
        <div id='readefine_example'>
          <ReadefineTooltip
            hoveredData={
              {
                original: "recapitulate",
                target: "sum up",
                definition: "To summarize clearly and briefly.",
                link: "https://en.wiktionary.org/wiki/recapitulate"
              }
            }
            readefineMode="reading"
          />
        </div>
      </div>
    </div>
  );
};

export default OBLearn