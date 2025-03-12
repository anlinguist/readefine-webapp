import { Tooltip, UnstyledButton } from '@mantine/core';
import { useContext } from 'react';
import { RDFNContext } from '../../RDFNContext';
import classes from './Buttons.module.css';
import { IconDownload } from '@tabler/icons-react';

function Download(props: any) {
    // @ts-expect-error TS(2339): Property 'downloadLink' does not exist on type 'un... Remove this comment to see the full error message
    const { downloadLink } = useContext(RDFNContext)
    return (
        <Tooltip classNames={{
            tooltip: classes.tooltip,
        }} withArrow label="Download this dictionary">
            <UnstyledButton href={downloadLink} className={`${props.permissionLevels} ${classes.link}`} download={props.doc_title} component="a">
                <IconDownload />
            </UnstyledButton>
        </Tooltip>
    )
}

export default Download