import { useContext } from 'react'
import { RDFNContext } from '../../RDFNContext';
import MarketingSettings from '../Marketing/MarketingSettings';
import { Alert, Divider, SegmentedControl, Text } from '@mantine/core';
import { useAuth } from '../../contexts/AuthContext';
import ReadefineAIToggle from './ReadefineAIToggle';
import classes from './SharedModalStyles.module.css';

function Settings() {
  // @ts-expect-error TS(2339): Property 'userCount' does not exist on type 'unknown'. Remove this comment to see the full error message
  const { userCount, userName, mode, setMode, updateUserProfileData } = useContext(RDFNContext);

  const { makeRdfnRequest } = useAuth();

  const handleUserResponse = async (subscribe = true) => {
    const endpoint = `/user/marketing${!subscribe ? '?subscribe=false' : ''}`;
    const resp = await makeRdfnRequest(endpoint, 'GET', {}, null);
    const updatedUserProfile = await resp.json();
    await updateUserProfileData(updatedUserProfile);
  };

  const switchModes = async () => {
    const newMode = mode === 'reading' ? 'learning' : 'reading';

    setMode(newMode);
    const raw = {
      "readefineMode": newMode
    };
    await makeRdfnRequest('/user/details', 'POST', {}, raw);
    // chrome.runtime.sendMessage({ swaction: "REREADEFINE_TABS" });
  };
    return (
      <>
        <SegmentedControl
          data={[
            { value: 'reading', label: 'Reading' },
            { value: 'learning', label: 'Learning' },
          ]}
          color="rdfnyellow.6"
          value={mode}
          onChange={switchModes}
          fullWidth
          autoContrast
          style={{ marginBottom: 20 }}
          classNames={{
            innerLabel: classes.buttonLabel
          }}
        />
        <Alert ta={'center'} variant="light" color="rdfnyellow.6">
          <Text size='md'>
            {
              mode === 'reading' ?
                `You're in Reading mode. This means that Readefine will automatically replace words and phrases, and you can see the original text by hovering over the replaced text.`
                :
                `You're in Learning mode. This means that Readefine will add a tooltip to words and phrases, and you can see the target text by hovering over the tooltip.`
            }
          </Text>
        </Alert>
        <Divider my="xl" />
        <MarketingSettings handleUserResponse={handleUserResponse} />
        <ReadefineAIToggle />
      </>
    )
}

export default Settings