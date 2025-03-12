import { Title } from "@mantine/core";

function HowToUse(props: any) {
    if (props.currentStep !== 4) {
        return null;
    }
  return (
    <div className='rdfn-onboarding-desc-wider'>
            <Title m={"auto"} ta={'center'} fw={'unset'} mb={'10px'} order={1}>How does Readefine work?</Title>
        <div style={{
        flex: 1,
      }}>
            <p>Readefine can reword the internet in a few ways:</p>
            <ul>
                <li><b>Dictionaries (find and replace).</b> Readefine finds phrases in your enabled dictionaries and replaces those phrases with the specified replacement.</li>
                <li><b>AI.</b> When you select text, Readefine will show you a button that allows you to reword the selected text using AI.</li>
                <li><b>Conversions.</b> Readefine can automatically convert distances, currencies, temperatures, and more.</li>
            </ul>
        </div>
    </div>
  )
}

export default HowToUse