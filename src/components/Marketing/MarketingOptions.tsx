import { Button, Group, Stack, Text } from '@mantine/core';
import classes from '../Modals/SharedModalStyles.module.css';
import { useState } from 'react';

function MarketingOptions({
  handleUserResponse
}: any) {
  const [noLoading, setNoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Stack>
      <Text>Would you like to receive emails about Readefine products and features?</Text>
      <Group justify="space-between">
        <Button  
          loading={noLoading}
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel
          }} mb={0} style={{ overflow: 'unset' }} variant="subtle" color="red" onClick={(() => {
            setNoLoading(true);
            handleUserResponse(false);
          })}>No thanks</Button>
        <Button
        loading={loading}
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel
          }} mb={0} style={{ overflow: 'unset' }} autoContrast color="rdfnyellow.6" onClick={(() => {
            setLoading(true);
            handleUserResponse(true)
          })}>Yes</Button>
      </Group>
    </Stack>
  )
}

export default MarketingOptions