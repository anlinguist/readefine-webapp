import { Alert, Text, Title } from '@mantine/core';
import SubscriptionOptions from './SubscriptionOptions';

function Subscription() {
  return (
    <div className="newsubscribecontainer">
        <Title m={"auto"} ta={'center'} fw={'unset'} mb={'10px'} order={1}>Readefine AI is available under 2 subscriptions.</Title>
        <SubscriptionOptions />
        <Alert ta={'center'} variant="light" color="rdfnyellow.6">
          <Text size='md'>A token is a word or punctuation mark. For example, "Hello, world!" has 4 tokens.</Text>
        </Alert>
    </div>
  )
}

export default Subscription