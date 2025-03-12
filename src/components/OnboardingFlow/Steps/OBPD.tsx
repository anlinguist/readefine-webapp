import { useContext, useState } from 'react';
import readefine_logo from '../../../assets/readefine_logo.png';
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { CgPlayListAdd } from "react-icons/cg";
import { RDFNContext } from '../../../RDFNContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Button, Text, Title } from '@mantine/core';
import classes from './OBPD.module.css';

const OBPD = (props: any) => {
  // @ts-expect-error TS(2339): Property 'setDictionaryContent' does not exist on type 'unknown'.
  const { setDictionaryContent, setDownloadLink } = useContext(RDFNContext);
  const { makeRdfnRequest } = useAuth();
  const [addedOblivious, setAddedOblivious] = useState(false)
  const [addingNewWord, setAddingNewWord] = useState(false)

  const submitNewWord = async () => {
    setAddingNewWord(true)

    // third, query the add endpoint to add the oblivious -> clueless as a readefinition
    let o = 'oblivious'
    let t = 'clueless'
    if (o === "" || t === "") {
      return
    }
    else {
      var raw = {
        "user": {
          "readefinitions": {
            [o]: {
              target: t
            }
          }
        }
      };

      const path = '/dictionary/readefinitions';
      const add_response = await makeRdfnRequest(path, 'PUT', {}, raw);

      const add_data = await add_response.json();
      add_data.sort((a: any, b: any) => a.original.localeCompare(b.original, undefined, { sensitivity: 'base' }))
      setDictionaryContent(add_data)
      let output = '';
      for (let i = 0, len = add_data.length; i < len; i++) {
        output = output + add_data[i]['original'] + "\t" + add_data[i]['target'] + "\t" + (add_data[i]['definition'] ? add_data[i]['definition'] : '') + "\t" + (add_data[i]['link'] ? add_data[i]['link'] : '') + "\n"
      }
      setDownloadLink("data:text/tab-separated-values," + encodeURIComponent(output));
    }

    setAddedOblivious(true)
    setAddingNewWord(false)
  }

  if (props.currentStep !== 6) {
    return null;
  }

  // @ts-expect-error TS(2345): Argument of type 'Location' is not assignable to p... Remove this comment to see the full error message
  let params = (new URL(document.location)).searchParams;
  let userbrowser = params.get("browser");
  if (!userbrowser) {
    userbrowser = "chrome"
  }

  return (
      <div className='rdfn-onboarding-desc-wider'>
        <Title m={"auto"} ta={'center'} fw={'unset'} mb={'10px'} order={1}>Create a Readefinition</Title>
        <div style={{
        flex: 1,
      }}>
          <p>You can make your own readefinitions in your personal dictionary and any other dictionaries that you've created.</p>
          <p>In this example, we'll Readefine the word 'oblivious', which means 'clueless'. We will add this new readefinition to your personal dictionary. Press the 'Add' button below.</p>
          <div id='rdfn-ob-add-form-container'>
            <div id='rdfn-ob-add-form'>
              <input disabled readOnly className='rdfn-ob-add-input' placeholder='Original' defaultValue={'oblivious'} />
              <input disabled readOnly className='rdfn-ob-add-input' placeholder='Target' defaultValue={'clueless'} />
              <Button onClick={(async(e) => {
                e.preventDefault()
                await submitNewWord()
              })} autoContrast loading={addingNewWord} variant="filled" type='submit' color='rdfnyellow.6' size="md" radius="md" m={"10px 0 0 0"}>Add</Button>
            </div>
          </div>
          {
            addedOblivious &&
            <div>
              <hr className='rdfn-onboarding-line'></hr>
              <Text>Great job!&nbsp;
                <Text classNames={{
                  root: classes.title
                  }} component='a' rel="noreferrer" href='https://en.wikipedia.org/wiki/Obliviousness' target={'_blank'}>Check out your new readefinition here.</Text>
              </Text>
              {
                userbrowser === "safariios" &&
                <p>To add more words, open the Readefine extension popup by clicking on the puzzle icon <IoExtensionPuzzleOutline></IoExtensionPuzzleOutline> in your address bar and clicking the Readefine icon <img alt='rdfn-inline-icon' className='rdfn-onboarding-icon' src={readefine_logo} />. Then click the add icon <CgPlayListAdd></CgPlayListAdd>.</p>
              }
              {
                userbrowser !== "safariios" &&
                <p>To add more words, open the Readefine extension by clicking the Readefine icon <img alt='rdfn-inline-icon' className='rdfn-onboarding-icon' src={readefine_logo} /> in your address bar and then click the add icon <CgPlayListAdd></CgPlayListAdd>.</p>
              }
              <Text>You can also add new words by visiting&nbsp;
                <Text classNames={{
                  root: classes.title
                  }} component='a' rel="noreferrer" href='https://app.readefine.ai' target={'_blank'}>the Readefine web app</Text>.
              </Text>
            </div>
          }
        </div>
      </div>
  );
};

export default OBPD