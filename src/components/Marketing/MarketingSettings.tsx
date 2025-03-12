import { useContext, useEffect, useState } from 'react'
import { RDFNContext } from '../../RDFNContext';
import MarketingOptions from './MarketingOptions';
import Unsubscribe from './Unsubscribe';
import Subscribe from './Subscribe';
import { Stack } from '@mantine/core';

const MarketingSettings = ({ handleUserResponse }: any) => {
    // @ts-expect-error TS(2339): Property 'readefineMarketingEmails' does not exist on type 'unknown'.
    const { showToastMessage, readefineMarketingEmails, readefineMarketingEmailsSet, setReadefineMarketingEmailsSet, setReadefineMarketingEmails } = useContext(RDFNContext);
    const [view, setView] = useState(null);

    useEffect(() => {
        if (readefineMarketingEmailsSet) {
            if (readefineMarketingEmails) {
                // @ts-expect-error TS(2345): Argument of type 'Element' is not assignable to pa... Remove this comment to see the full error message
                setView(<Unsubscribe handleUserResponse={handleUserResponse} />)
            } else {
                // @ts-expect-error TS(2345): Argument of type 'Element' is not assignable to pa... Remove this comment to see the full error message
                setView(<Subscribe handleUserResponse={handleUserResponse} />)
            }
        } else {
            // @ts-expect-error TS(2345): Argument of type 'Element' is not assignable to pa... Remove this comment to see the full error message
            setView(<MarketingOptions handleUserResponse={handleUserResponse} />)
        }
    }, [readefineMarketingEmails])
    return (
        <Stack>
            {
                view &&
                view
            }
        </Stack>
    )
}

export default MarketingSettings