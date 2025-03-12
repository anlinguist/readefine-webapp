import { useContext } from 'react'
import { RDFNContext } from '../../../RDFNContext';

function AIStyleCard({
    styleName,
    setIsConfirmOpen,
    setCardToRemove
}: any) {
    // @ts-expect-error TS(2339): Property 'setChosenAIStyle' does not exist on type 'un... Remove this comment to see the full error message
    const { setChosenAIStyle } = useContext(RDFNContext);
    const editAIStyle = async (styleName: any) => {
        setChosenAIStyle(styleName);
    }
    return (
        <div className="aistylecard" onClick={() => editAIStyle(styleName)}>
            <div className="aistylecard-content">
                <p>{styleName}</p>
            </div>
            <div className="aistylecard-remove" onClick={((e) => {
                e.stopPropagation();
                setIsConfirmOpen(true);
                setCardToRemove(styleName);                
            })}
            >&times;</div>
        </div>
    );
}

export default AIStyleCard