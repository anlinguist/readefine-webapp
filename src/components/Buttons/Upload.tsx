import { Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Buttons.module.css';
import { IconUpload } from '@tabler/icons-react';

function Upload({ upload }: any) {
    return (
        <Tooltip classNames={{
            tooltip: classes.tooltip,
        }} withArrow label="Upload Readefinitions to this dictionary">
            <UnstyledButton className={`${classes.link}`} onClick={upload}>
                <IconUpload />
            </UnstyledButton>
        </Tooltip>
    )
}

export default Upload