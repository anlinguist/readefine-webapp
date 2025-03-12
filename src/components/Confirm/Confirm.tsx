import { Button } from '@mantine/core';
import './Confirm.css';

const Confirm = ({
    isOpen,
    message,
    onConfirm,
    onCancel
}: any) => {
    if (!isOpen) return null;

    return (
        <div id='rdfn-modal-container' className="showmodal" onClick={onCancel}>
            <div id='addwordtod' className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="confirm-message">{message}</div>
                <div className="confirm-buttons">
                    <Button autoContrast variant="transparent" onClick={onCancel} color='red' size="md" radius="md" m={"10px 0 0 0"}>Cancel</Button>
                    <Button autoContrast variant="filled" onClick={onConfirm} color='rdfnyellow.6' size="md" radius="md" m={"10px 0 0 0"}>Confirm</Button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;