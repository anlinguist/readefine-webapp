import { useState } from 'react'
import { useEffect } from 'react';

function DemoToggle() {
    const [currentStatus, setCurrentStatus] = useState(false);
    const [readefine, setReadefine] = useState(null);
    const toggleStatus = (e: any) => {
        setCurrentStatus(e.target.checked);
        if (e.target.checked) {
            // @ts-expect-error TS(2552): Cannot find name 'Readefine'. Did you mean 'readef... Remove this comment to see the full error message
            // eslint-disable-next-line no-undef
            (window as any).readefine = new Readefine();
            setReadefine((window as any).readefine);
        } else {
            disableReadefine();
        }
    }
    const disableReadefine = () => {
        (window as any).readefine.turnOff();
        (window as any).readefine = null;
        setReadefine(null);
    }
    const waitForElementAndSelectText = () => {
        const intervalId = setInterval(() => {
            const section = document.getElementById('section1');
            if (section) {
                const subslogan = section.getElementsByClassName('subslogan')[0];
                if (subslogan && subslogan.querySelector('.readefiningAWord')) {
                    let range = document.createRange();
                    let selection = window.getSelection();
                    range.selectNodeContents(subslogan);
                    // @ts-expect-error TS(2531): Object is possibly 'null'.
                    selection.removeAllRanges();
                    // @ts-expect-error TS(2531): Object is possibly 'null'.
                    selection.addRange(range);
                    clearInterval(intervalId);
                }
            }
        }, 500);
    }

    useEffect(() => {
        if ((window as any).readefine) {
            (window as any).readefine.collectDataAndReadefine();
            waitForElementAndSelectText();
        }
    }, [readefine]);

    return (
        <div id='demoContainer'>
            <div>Try it out:</div>
            <label className="switch">
                <input className="addonenabler" checked={currentStatus} type="checkbox" onChange={(e) => toggleStatus(e)} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default DemoToggle