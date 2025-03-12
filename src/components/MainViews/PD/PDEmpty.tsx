import { CgPlayListAdd } from 'react-icons/cg';
import { openContextModal } from '@mantine/modals';

function PDEmpty() {
    const addToPDContainer = () => {
        openContextModal({
            modal: "add-readefinition",
            title: "Add a Readefinition",
            size: "sm",
            centered: true,
            innerProps: {},
        });
    }

    return (
        <div className="emptyrdfndict" onClick={(() => addToPDContainer())}>
            <CgPlayListAdd className="emptyrdfndicticon" />
            <div className="emptyrdfndicttxt">This dictionary has no Readefinitions. Click here to add one!</div>
        </div>
    )
}

export default PDEmpty