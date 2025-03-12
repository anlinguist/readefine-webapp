import { Alert, Text, Title } from '@mantine/core';
import SubscriptionOptions from '../../MainViews/Subscription/SubscriptionOptions';
import { useEffect, useRef } from 'react';

function SelectToReadefineIframe({ iframeRef }: any) {

  return (
    <iframe
      id="hl2rdfninline"
      ref={iframeRef}
      src="/Readefine/select-to-readefine/dist/index.html"
      style={{ border: 'none' }}
    ></iframe>
  );
}

function ReadefineAI(props: any) {
  if (props.currentStep !== 8) {
    return null;
  }

  /* if this message occurs, need to reload wait 2 seconds and reload iframe
    const messageData = {
      type: 'READEFINE_SELECTION',
      operation: selectedOperation,
      value: selectedValue
    };
    console.log("posting message for REDEFINE_SELECTION")
    window.parent.postMessage(messageData, "*");
  */

    const iframeRef = useRef<any>(null);

    useEffect(() => {
      function handleMessage(event: any) {

        const messageData = event.data;
        if (messageData && messageData.type === 'READEFINE_SELECTION') {
          setTimeout(() => {
            iframeRef.current.contentWindow.postMessage({ type: 'STOP_READEFINE' }, "*")
          }, 2000);
        }
      }
  
      window.addEventListener('message', handleMessage);
  
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);

  return (
    <div className='rdfn-onboarding-desc-wider'>
      <Title m={"auto"} ta={'center'} fw={'unset'} mb={'10px'} order={1}>Readefine AI</Title>
      <div style={{
        flex: 1,
      }}>
        <p>When you select text in a website, you'll see a banner that allows you to reword the selection using Readefine AI.</p>
        <SelectToReadefineIframe iframeRef={iframeRef} />
        <p style={{marginTop: '-80px'}}>Choose a rewording style, like 'Simplify' or 'Translate'. Depending on the style, you may need to choose a specific target, like a simplification level or a target language to translate into. To readefine the selection, just press the play button (it won't actually do anything here).</p>
        <p>The basic verison of Readefine AI is free and allows you to reword up to 1,000 tokens per day. To get more tokens and enable custom targets and styles, you can upgrade to Readefine Pro - here's a breakdown of the two options:</p>
        <SubscriptionOptions />
        <Alert ta={'center'} variant="light" color="rdfnyellow.6">
            <Text size='md'>A token is a word or punctuation mark. For example, "Hello, world!" has 4 tokens.</Text>
        </Alert>
      </div>
    </div>
  )
}

export default ReadefineAI