import { Alert, Text, Title } from "@mantine/core";

function Dictionaries(props: any) {
    if (props.currentStep !== 5) {
        return null;
    }
  return (
    <div className='rdfn-onboarding-desc-wider'>
        <Title m={"auto"} ta={'center'} fw={'unset'} mb={'10px'} order={1}>Readefine Dictionaries</Title>
        <div style={{
        flex: 1,
      }}>
            <p>Readefine has 2 types of dictionaries:</p>
            <ul>
                <li><b>Personal</b> This is your own private dictionary.</li>
                <li><b>Community</b> These are public dictionaries that anyone can use.</li>
            </ul>
            <hr className='rdfn-onboarding-line'></hr>
            <p>You can view all the Readefinitions of a dictionary and enable or disable any dictionary based on what you want reworded.</p>
            <p>Dictionaries can be edited and managed by their creator and Readefine admins.</p>
            <Alert ta={'center'} variant="light" color="rdfnyellow.6">
                <Text size='md'>Readefinitions from enabled dictionaries are automatically replaced in every website.</Text>
            </Alert>
        </div>
    </div>
  )
}

export default Dictionaries