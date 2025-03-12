import { Accordion, Text, Title, Tooltip } from "@mantine/core";
import { IconTransform } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from './ConversionsHome.module.css';
import { useContext, useEffect } from "react";
import { RDFNContext } from "../../../RDFNContext";

function ConversionsHome() {
    // @ts-ignore
    const { setConversionCategoryName } = useContext(RDFNContext);
    const navigate = useNavigate();

    const data = [
        {
            question: "What is Readefine Conversions?",
            answer: "Readefine Conversions allows you to automatically convert currencies or units of length, area, volume, weight, temperature, and more."
        },
        {
            question: "How does it work?",
            answer: "First, you'll need to enable some conversions you want to use (such as Meters to Feet). Then, Readefine will automatically look for labeled numbers where the labels include any of the defined labels for the enabled conversions. When it finds a match, it will automatically convert the number to the desired unit and display the conversion in a tooltip."
        },
        {
            question: "Why did one of my conversions get disabled when I enabled another?",
            answer: "Readefine Conversions can only convert one unit into another. If you enable a conversion such as `Meters to Feet` and then enable another conversion such as `Meters to Yards`, the `Meters to Feet` conversion will be disabled because it conflicts with the `Meters to Yards` conversion. Or, if you have `Meters to Feet` enabled and you enable `Feet to Meters`, the `Meters to Feet` conversion will be disabled."
        }
    ]

    useEffect(() => {
        setConversionCategoryName("");
    }, []);


    return (
        <div className="rdfn-mdw">
            <div className='rdfn-pro-container'>
                <IconTransform stroke={1.2} size={54} />
                <Title order={2} m={"0 auto"} fw={'unset'} mb={'10px'}>Welcome to <Tooltip classNames={{
                    tooltip: classes.tooltip,
                }} withArrow label="Readefine Conversions allows you to automatically convert currencies, distances, volumes, weights, temperatures, speeds, and more!"><Text classNames={{
                    root: classes.title,
                }} fz={"var(--mantine-h2-font-size)"} component='span'>Readefine Conversions!</Text></Tooltip></Title>
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
                }} onClick={(() => { navigate(`/conversions/currency`) })}>Currency</Text> or <Text component='span' classNames={{
                    root: classes.rdfnlink
                }} onClick={(() => { navigate(`/conversions/distance`) })}>Distance</Text> conversions.</Text>}</Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default ConversionsHome;