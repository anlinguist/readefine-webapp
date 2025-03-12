import { useContext, useState } from 'react'
import { RDFNContext } from '../../RDFNContext'
import { useAuth } from '../../contexts/AuthContext';
import { Button, Stack, Textarea, TextInput } from '@mantine/core';
import { ContextModalProps } from "@mantine/modals";
import classes from './SharedModalStyles.module.css';

type AddReadefinitionProps = {};

function AddReadefinition({ }: ContextModalProps<AddReadefinitionProps>) {
  // @ts-expect-error TS(2339): Property 'dictionaryName' does not exist on type 'unkn... Remove this comment to see the full error message
  const { dictionaryName, dictionaryType, setDictionaryContent, setDownloadLink, showToastMessage } = useContext(RDFNContext);
  const { makeRdfnRequest } = useAuth();
  const [addingWord, setAddingWord] = useState(false);

  const [original, setOriginal] = useState('');
  const [target, setTarget] = useState('');
  const [definition, setDefinition] = useState('');
  const [link, setLink] = useState('');

  const submitNewReadefinition = async (e: any) => {
    e.preventDefault()

    if (original === "" || target === "") {
      return;
    }
    else {
      setAddingWord(true)
      let add;
      let readefinitionsData = {
        [original]: {
          target: target,
          ...(definition !== '' ? { definition: definition } : {}),
          ...(link !== '' ? { link: link } : {})
        }
      };
      switch (dictionaryType) {
        case 'user':
          add = { user: { readefinitions: readefinitionsData } };
          break;
        case 'addon':
          add = { addon: { addonName: dictionaryName, readefinitions: readefinitionsData } };
          break;
        case 'readefine':
          if (['Main', 'US', 'UK'].includes(dictionaryName)) {
            switch (dictionaryName) {
              case 'Main':
                add = { main: { readefinitions: readefinitionsData } };
                break;
              default:
                add = { [dictionaryName]: { readefinitions: readefinitionsData } };
                break;
            }
          }
          break;
        default:
          break;
      }

      const path = '/dictionary/readefinitions';
      const add_response = await makeRdfnRequest(path, 'PUT', {}, add);
      const add_data = await add_response.json();
      add_data.sort((a: any, b: any) => a.original.localeCompare(b.original, undefined, { sensitivity: 'base' }))
      setDictionaryContent(add_data)
      let output = '';
      for (let i = 0, len = add_data.length; i < len; i++) {
        output = output + add_data[i]['original'] + "\target" + add_data[i]['target'] + "\target" + (add_data[i]['definition'] ? add_data[i]['definition'] : '') + "\target" + (add_data[i]['link'] ? add_data[i]['link'] : '') + "\n"
      }
      setDownloadLink("data:text/tab-separated-values," + encodeURIComponent(output));
      showToastMessage("Readefinition added!", "success")
      setAddingWord(false)

      setOriginal('')
      setTarget('')
      setDefinition('')
      setLink('')

      // @ts-expect-error TS(2531): Object is possibly 'null'.
      document.getElementById('addwordtod-original').focus()
    }
  }

  return (
    <form onSubmit={submitNewReadefinition}>
      <Stack gap={'md'}>
        <TextInput
          placeholder="Original*"
          required
          value={original}
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          onChange={(e) => setOriginal(e.target.value)}
        />
        <TextInput
          placeholder="Target*"
          required
          value={target}
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          onChange={(e) => setTarget(e.target.value)}
        />
        <Textarea
          placeholder="Definition"
          value={definition}
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <TextInput
          placeholder="Link"
          value={link}
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          onChange={(e) => setLink(e.target.value)}
        />
      </Stack>

      <Button 
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel
          }} w={"100%"} m={'20px 0px 0'} autoContrast loading={addingWord} variant="filled" type='submit' color='rdfnyellow.6' radius="md">Add</Button>
    </form>
  );
}

export default AddReadefinition