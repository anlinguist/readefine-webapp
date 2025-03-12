import { useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RDFNContext } from '../../RDFNContext';
import MarketingSettings from '../Marketing/MarketingSettings';
import { ContextModalProps } from '@mantine/modals';

function MarketingModal({ context, id }: ContextModalProps) {
  // @ts-expect-error TS(2339): Property 'showToastMessage' does not exist on type 'unknown'.
  const { showToastMessage, updateUserProfileData } = useContext(RDFNContext);
  const { makeRdfnRequest } = useAuth();
  const handleUserResponse = async (subscribe = true) => {
    const endpoint = `/user/marketing${!subscribe ? '?subscribe=false' : ''}`;
    const resp = await makeRdfnRequest(endpoint, 'GET', {}, null);
    const updatedUserProfile = await resp.json();
    await updateUserProfileData(updatedUserProfile);
    context.closeModal(id);
  };
  return (
    <MarketingSettings handleUserResponse={handleUserResponse} />
  )
}

export default MarketingModal