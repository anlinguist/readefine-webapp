import { Button, Group, Text } from "@mantine/core";
import classes from '../Modals/SharedModalStyles.module.css';
import { useState } from "react";


function Unsubscribe({
  handleUserResponse
}: any) {
  const [loading, setLoading] = useState(false);
  return (
    <Group style={{flexDirection: "column"}} justify="space-between">
        <Text>You're currently subscribed to get product and feature updates from us.</Text>
        <Button
          loading={loading}
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel
          }} style={{overflow: 'unset'}} variant="subtle" color="red" onClick={(() => {
            setLoading(true);
            handleUserResponse(true)
          })
          }>Unsubscribe</Button>
    </Group>
  )
}

export default Unsubscribe