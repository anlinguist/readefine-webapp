import { Button, Group, Text } from "@mantine/core";
import classes from '../Modals/SharedModalStyles.module.css';
import { useState } from "react";


function Subscribe({
  handleUserResponse
}: any) {
  const [loading, setLoading] = useState(false);
  return (
    <Group style={{flexDirection: 'column'}} justify="space-between">
        <Text>You're not currently subscribed to get product and feature updates from us.</Text>
        <Button
          loading={loading}
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel
          }} style={{overflow: 'unset'}}  autoContrast color="rdfnyellow.6" onClick={(() => {
            setLoading(true);
            handleUserResponse(true);
          })}>Subscribe</Button>
    </Group>
  )
}

export default Subscribe