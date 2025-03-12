import { useContext } from 'react';
import { RDFNContext } from '../../../RDFNContext';
import { IconCrown } from '@tabler/icons-react';
import { Accordion, Button, Text, Title, Tooltip } from '@mantine/core';
import classes from './ProWelcome.module.css';
import SubscriptionOptions from '../Subscription/SubscriptionOptions';

function ProWelcome() {
    // @ts-expect-error TS(2339): Property 'proPaymentSystem' does not exist on type... Remove this comment to see the full error message
    const { proPaymentSystem, proStatus } = useContext(RDFNContext);

    const data = [
        {
            question: "How does Readefine AI work?",
            answer: "Readefine AI allows you to select some text in any website and choose how you'd like AI to reword the selected text."
        },
        {
            question: "What's Readefine Pro?",
            answer: "Readefine Pro allows you to change the styles and targets that Readefine offers when rewording text with Readefine AI. For example, you can add a new language to translate into, or change the level of reading difficulty."
        },
        {
            question: "What are styles?",
            answer: "Styles are how you want the text to be reworded. For example, the 'Translate' style will translate the text into a different language."
        },
        {
            question: "What are targets?",
            answer: "Targets are additional details about the style. For example, the 'Translate' style has a number of target languages you can translate into."
        }
    ]

    return (
        <div className="rdfn-mdw rdfn-pro">
            <div className='rdfn-pro-container'>
                <IconCrown className={classes.icon} stroke={1.2} size={54} />
                <Title order={2} m={"0 auto"} fw={'unset'} mb={'10px'}>Welcome to <Tooltip classNames={{
                    tooltip: classes.tooltip,
                }} withArrow label="Readefine AI gives you the power to reword anything on the internet with AI"><Text classNames={{
                    root: classes.title,
                }} fz={"var(--mantine-h2-font-size)"} component='span'>Readefine AI!</Text></Tooltip></Title>
                {
                    proStatus &&
                    <div id='rdfn-pro-current-sub'>
                        <div className='current-sub-title'>{`You purchased your subscription using ${proPaymentSystem}`}</div>
                        {
                            proPaymentSystem === 'Stripe' &&
                            <Button component='a' href='https://billing.stripe.com/p/login/14k8A1cm2aOt1Ec4gg' autoContrast variant="filled" type='submit' color='rdfnyellow.6' size="md" radius="md" m={"10px 0 0 0"}>Manage</Button>
                        }
                        {
                            proPaymentSystem === 'Apple' &&
                            <div className='rdfnmodeexplainer'>
                                <div className='rdfnmodeexclamation'>&#xe88f;</div>
                                <p>To manage your subscription, open your Apple settings and tap your name at the top of the screen. Then, tap 'Subscriptions'.</p>
                            </div>
                        }
                    </div>

                }
                {
                    !proStatus &&
                    <SubscriptionOptions/>
                }
                <Accordion classNames={{
                    root: classes.accordionroot,
                    label: classes.label,
                }} className={classes.accordion} variant='separated'>
                    {
                        data.map((item, index) => (
                            <Accordion.Item key={index} className={classes.item} value={item.question}>
                                <Accordion.Control>{item.question}</Accordion.Control>
                                <Accordion.Panel>{item.answer}</Accordion.Panel>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            </div>
        </div>
    );
}

export default ProWelcome;
