import { Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Buttons.module.css';
import { IconArrowLeft } from '@tabler/icons-react';

function BackToDictionaries({back, label}: any) {
  return (
    <Tooltip classNames={{
      tooltip: classes.tooltip,
  }} zIndex={1001} withArrow label={label}>
        <UnstyledButton onClick={back} className={`${classes.bblink}`}>
            <IconArrowLeft />
        </UnstyledButton>
    </Tooltip>
  )
}

export default BackToDictionaries