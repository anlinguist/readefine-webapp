import { Accordion, Text, Title, Tooltip } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './CDWelcome.module.css';
import { IconBooks } from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import { RDFNContext } from '../../../RDFNContext';

function CDWelcome() {
    // @ts-ignore
    const { setDictionaryName } = useContext(RDFNContext);
    const navigate = useNavigate();

    useEffect(() => {
      setDictionaryName('');
    }, []);

    const data = [
        {
            question: "What are Community Dictionaries?",
            answer: "Community Dictionaries are dictionaries created by the Readefine community. Anyone can create a dictionary, and any other Readefine user can view and use those dictionaries."
        },
        {
            question: "Who can create a Community Dictionary?",
            answer: "Anyone can create a Community Dictionary. Just click the 'New dictionary' button on the Community Dictionaries page."
        },
        {
            question: "Who can edit a specific Community Dictionary?",
            answer: "The creator of the Community Dictionary and Readefine admins can edit it. If you want to edit a dictionary that you didn't create, you can make a copy of it and edit the copy."
        }
    ]
    return (
        <div className="rdfn-mdw">
            <div className='rdfn-pro-container'>
                <IconBooks stroke={1.2} size={54} />
                <Title order={2} m={"0 auto"} fw={'unset'} mb={'10px'}>Welcome to <Tooltip classNames={{
                    tooltip: classes.tooltip,
                }} withArrow label="Community dictionaries are made by the Readefine community."><Text classNames={{
                    root: classes.title,
                }} fz={"var(--mantine-h2-font-size)"} component='span'>Community Dictionaries!</Text></Tooltip></Title>
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
                    <Accordion.Item className={classes.item} value={"Don't know where to start?"}>
                        <Accordion.Control>{"Don't know where to start?"}</Accordion.Control>
                        <Accordion.Panel>{<Text>Check out the <Text component='span' classNames={{
                    root: classes.rdfnlink
                }} onClick={(() => { navigate(`/community-dictionaries/Business`) })}>Business</Text> or <Text component='span' classNames={{
                    root: classes.rdfnlink
                }} onClick={(() => { navigate(`/community-dictionaries/Medical`) })}>Medical</Text> dictionaries.</Text>}</Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default CDWelcome;
