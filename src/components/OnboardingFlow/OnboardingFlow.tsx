import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './OB.css';
import OBLearn from './Steps/OBLearn';
import OBCD from './Steps/OBCD';
import MultiStepProgressBar from "./MultiStepProgressBar";
import OBFinish from './Steps/OBFinish';
import HowToUse from './Steps/HowToUse';
import Dictionaries from './Steps/Dictionaries';
import ReadefineAI from './Steps/ReadefineAI';
import OBPD from './Steps/OBPD';
import OBLogin from './Steps/OBLogin';
import OBVerify from './Steps/OBVerify';

const OnboardingFlow = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [access, setAccess] = useState(false);
    const [blockNext, setBlockNext] = useState(false);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    const _next = () => {
        document.querySelectorAll("html")[0].scrollIntoView({ behavior: 'smooth' });
        let step = currentStep >= Object.keys(stepComponents).length ? Object.keys(stepComponents).length : currentStep + 1;
        setDirection(1);
        setCurrentStep(step);
    };

    const _prev = () => {
        document.querySelectorAll("html")[0].scrollIntoView({ behavior: 'smooth' });
        let step = currentStep <= 1 ? 1 : currentStep - 1;
        setDirection(-1);
        setCurrentStep(step);
    };

    const _goTo = (newPage: number) => {
        document.querySelectorAll("html")[0].scrollIntoView({ behavior: 'smooth' });
        setDirection(newPage > currentStep ? 1 : -1);
        setCurrentStep(newPage);
    };

    const _grantAccess = () => {
        setAccess(true);
    }

    const stepComponents: any = {
        1: <OBVerify currentStep={currentStep} nextItem={_next} goTo={_goTo} grantAccess={_grantAccess} />,
        2: <OBLogin currentStep={currentStep} goTo={_goTo} access={access} setBlockNext={setBlockNext}/>,
        3: <OBLearn currentStep={currentStep} nextItem={_next} goTo={_goTo} />,
        4: <HowToUse currentStep={currentStep} nextItem={_next} goTo={_goTo} />,
        5: <Dictionaries currentStep={currentStep} nextItem={_next} goTo={_goTo} />,
        6: <OBPD currentStep={currentStep} nextItem={_next} goTo={_goTo} />,
        7: <OBCD currentStep={currentStep} nextItem={_next} goTo={_goTo} />,
        8: <ReadefineAI currentStep={currentStep} nextItem={_next} goTo={_goTo} />,
        9: <OBFinish currentStep={currentStep} nextItem={_next} goTo={_goTo} />,
    };

    const variants = {
        enter: (direction: number) => ({
            opacity: 0,
            x: direction > 0 ? 100 : -100,
            overflow: "scroll",
            marginTop: "30px",
            scrollbarWidth: "none",
            flex: 1
        }),
        center: {
            opacity: 1,
            x: 0,
            overflow: "scroll",
            marginTop: "30px",
            scrollbarWidth: "none",
            flex: 1
        },
        exit: (direction: number) => ({
            opacity: 0,
            x: direction > 0 ? -100 : 100,
            overflow: "scroll",
            marginTop: "30px",
            scrollbarWidth: "none",
            flex: 1
        }),
    };

    return (
        <div className="onboardingflow">
            <MultiStepProgressBar
                currentStep={currentStep}
                nextItem={_next}
                prevItem={_prev}
                goTo={_goTo}
                blockNext={blockNext}
                stepComponents={stepComponents}
            />
            <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                    key={currentStep}
                    custom={direction}
                    // @ts-ignore
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                >
                  {stepComponents[currentStep]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default OnboardingFlow;