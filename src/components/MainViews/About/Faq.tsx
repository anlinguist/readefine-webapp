import { Title, Accordion, Space, Stack } from '@mantine/core';
import classes from './Faq.module.css';
import parse from 'html-react-parser';

interface FAQA {
    title: string;
    qa: {
        question: string;
        answer: string;
    }[];
}

export default function Faq() {
    const data: FAQA[] = [
        {
            title: "General",
            qa: [
                {
                    question: "What is Readefine?",
                    answer: "Readefine is a browser extension that rewords the internet. It helps you understand difficult words and phrases by providing definitions, translations, and examples in context. Readefine is designed to help you improve your vocabulary and understand more while you browse the web."
                },
                {
                    question: "How can I use Readefine?",
                    answer: "You can manage your Readefine account with the Readefine browser extension or the Readefine web app. The extension is required to actually apply the rewording to the web pages you visit. The extension popup and the Readefine web app allow you to manage your account, personal dictionary, community dictionaries, and pro settings."
                }
            ]
        },
        {
            title: "Personal Dictionaries",
            qa: [
                {
                    question: "What is a personal dictionary?",
                    answer: "A personal dictionary is a dictionary that is created and maintained by an individual user. The user can add and edit entries, and the dictionary is customized to their specific needs and preferences."
                },
                {
                    question: "How can I create a personal dictionary?",
                    answer: "You can create a personal dictionary by signing up for an account on Readefine. Once you have an account, you can start adding and editing entries to your own dictionary."
                },
                {
                    question: "How can I use a personal dictionary?",
                    answer: "You can use a personal dictionary to look up definitions, translations, and examples of words. You can also add notes and tags to entries, and organize them into categories or folders."
                }
            ]
        },
        {
            title: "Community Dictionaries",
            qa: [
                {
                    question: "What is a community dictionary?",
                    answer: "A community dictionary is a dictionary that is created and maintained by a community of users. The community can add and edit entries, and the dictionary is constantly evolving as new words are added and definitions are updated."
                },
                {
                    question: "How can I contribute to a community dictionary?",
                    answer: "To contribute to a community dictionary, you can create an account on the dictionary website and start adding and editing entries. You can also vote on entries to help determine which definitions are the most accurate and useful."
                },
                {
                    question: "How are community dictionaries moderated?",
                    answer: "Community dictionaries are moderated using a combination of artificial intelligence and ad hoc review. The artificial intelligence system helps to identify potentially problematic entries, which are then reviewed by human moderators to determine if they should be removed or edited."
                }
            ]
        },
        {
            title: "Pro",
            qa: [
                {
                    question: "What is Readefine Pro?",
                    answer: "Readefine Pro is a premium version of Readefine that offers additional features and benefits. Pro users have access to advanced rewording options, unlimited personal dictionaries, and priority support."
                },
                {
                    question: "How can I upgrade to Readefine Pro?",
                    answer: "You can upgrade to Readefine Pro by signing up for a Pro account on the Readefine website. Pro accounts are available on a monthly or annual subscription basis, and you can cancel your subscription at any time."
                },
                {
                    question: "What are the benefits of Readefine Pro?",
                    answer: "Readefine Pro offers a number of benefits, including advanced rewording options, unlimited personal dictionaries, and priority support. Pro users also have access to exclusive features and updates that are not available to free users."
                }
            ]
        }
    ];
    return (
        <Stack mih={"rem(650px)"}>
            <Title ta="center" className={classes.title}>
                FAQ
            </Title>
            <Space h="lg" />
            <Accordion variant="separated">
                {data.map((section: any, index: any) => (
                    <Accordion.Item key={index} className={classes.item} value={section.title}>
                        <Accordion.Control>{section.title}</Accordion.Control>
                        <Accordion.Panel>

                            <Accordion variant="separated">
                                {section.qa.map((qa: any, nindex: any) => (
                                    <Accordion.Item key={nindex} className={classes.item} value={qa.question}>
                                        <Accordion.Control>{qa.question}</Accordion.Control>
                                        <Accordion.Panel>{parse(qa.answer)}</Accordion.Panel>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Stack>
    );
}