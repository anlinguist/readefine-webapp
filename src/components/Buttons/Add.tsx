import { Tooltip, UnstyledButton } from '@mantine/core'
import classes from './Buttons.module.css';
import { IconDatabasePlus } from '@tabler/icons-react';

function Add({ add, label }: any) {
    return (
        <Tooltip classNames={{
            tooltip: classes.tooltip,
        }} withArrow label={label}>
            <UnstyledButton onClick={add} className={classes.link}>
                <IconDatabasePlus />
            </UnstyledButton>
        </Tooltip>
    )
}

export default Add