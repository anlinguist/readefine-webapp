/*global chrome*/
import { useContext, useEffect, useState } from 'react';
import './Pro.css';
import Confirm from '../../Confirm/Confirm';
import { RDFNContext } from '../../../RDFNContext';
import ReadefineAIStyles from './ReadefineAIStyles';
import ProWelcome from './ProWelcome';
import { useAuth } from '../../../contexts/AuthContext';
import { IconCodePlus } from '@tabler/icons-react';
import StyleList from './StyleList';
import { openContextModal } from '@mantine/modals';
import { Button, Stack } from '@mantine/core';

function Pro() {
    // @ts-expect-error TS(2339): Property 'aiPromptOptions' does not exist on type ... Remove this comment to see the full error message
    const { aiPromptOptions, chosenAIStyle, setChosenAIStyle, setAIPromptOptions, showToastMessage, proStatus } = useContext(RDFNContext);
    const { makeRdfnRequest } = useAuth();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [cardToRemove, setCardToRemove] = useState(false);

    const handleDelete = (styleName: any) => {
        setIsConfirmOpen(false);
        removeCard(styleName);
    };

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
    }

    const removeCard = async (styleName: any) => {
        const msg = `Removed ${styleName} style`;
        await updateStyles(styleName, "DELETE", msg);
        setChosenAIStyle('');
    }
    const addStyle = async () => {
        openContextModal({
            modal: "add-new-style",
            title: "Add a new style",
            size: "sm",
            centered: true,
            innerProps: {},
        });
    }

    useEffect(() => {
        return () => {
            setChosenAIStyle('');
        }
    }, [setChosenAIStyle]);

    return <>
        <Confirm
            isOpen={isConfirmOpen}
            message={`Are you sure you want to delete the ${cardToRemove} Readefine AI style?`}
            onConfirm={((e: any) => {
                e.stopPropagation();
                handleDelete(cardToRemove);
            })}
            onCancel={() => setIsConfirmOpen(false)}
        />
        <div id='propagecontainer' className='row'>
            {
                aiPromptOptions &&
                <Stack id='aiStylesContainer' className={chosenAIStyle ? 'selectedStyle' : ''} gap={0}>
                    <Button
                    disabled={!proStatus}
                     styles={{
                        root: {
                            padding: '5px',
                            boxSizing: 'content-box'
                        },
                        label: {
                            fontSize: 'var(--mantine-font-size-md)'
                        }
                    }} onClick={addStyle} autoContrast color="rdfnyellow.6" leftSection={<IconCodePlus size={20} />} variant="filled" mt={0} mb={"10px"} radius="md">
                        New style
                    </Button>
                    <div id='existingAIStyles'>
                        <StyleList setIsConfirmOpen={setIsConfirmOpen} setCardToRemove={setCardToRemove} />
                    </div>
                </Stack>
            }
            {
                chosenAIStyle &&
                <ReadefineAIStyles />
            }
            {
                !chosenAIStyle &&
                <ProWelcome />
            }
        </div>
    </>;
}

export default Pro