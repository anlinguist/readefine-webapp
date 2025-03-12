import { useContext, useState } from 'react'
import { RDFNContext } from '../../RDFNContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Stack, Textarea, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import classes from './SharedModalStyles.module.css';

type EditReadefinitionProps = {
  wordObj: {
    original: string,
    target: string,
    definition: string,
    link: string
  }
  // setSaving method to inform UI
  setSaving: (saving: boolean) => void
};

function EditReadefinition({ context, id, innerProps }: ContextModalProps<EditReadefinitionProps>) {
  const { wordObj, setSaving } = innerProps;
  // @ts-expect-error TS(2339): Property 'dictionaryName' does not exist on type 'unkn... Remove this comment to see the full error message
  const { dictionaryName, dictionaryType, setDictionaryContent, setDownloadLink, showToastMessage } = useContext(RDFNContext)
  const { makeRdfnRequest } = useAuth();
  const [original, setOriginal] = useState(wordObj?.original || '');
  const [target, setTarget] = useState(wordObj?.target || '');
  const [definition, setDefinition] = useState(wordObj?.definition || '');
  const [link, setLink] = useState(wordObj?.link || '');
  const [submittingEdit, setSubmittingEdit] = useState(false);

  const submitNewReadefinition = async (e: any) => {
    e.preventDefault()
    let newOriginal = original.trim();
    let newTarget = target.trim();
    let newDefinition = definition.trim();
    let newLink = link.trim();

    if (newOriginal === "" || newTarget === "") {
      return
    }
    else {
      let originalOriginal = wordObj && wordObj['original'] ? wordObj['original'] : ''
      let originalTarget = wordObj && wordObj['target'] ? wordObj['target'] : ''
      let originalDefinition = wordObj && wordObj['definition'] ? wordObj['definition'] : ''
      let originalLink = wordObj && wordObj['link'] ? wordObj['link'] : ''

      if (newOriginal === originalOriginal && newTarget === originalTarget && newDefinition === originalDefinition && newLink === originalLink) {
        return
      }
      setSaving(true);
      setSubmittingEdit(true);
      // if o has changed, then delete original readefinition and create a new one

      if (newOriginal !== originalOriginal) {
        let deleteBody = {
          [dictionaryType]: {
            readefinitions: {
              [originalOriginal]: {
                target: "placeholder"
              }
            }
          }
        }
        if (dictionaryType === "addon") {
          // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
          deleteBody['addon']['addonName'] = dictionaryName
        }

        var deleteRequestOptions = {
          method: 'DELETE',
          headers: {},
          body: JSON.stringify(deleteBody),
          redirect: 'follow'
        };

        if (dictionaryType !== 'personal') {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          deleteRequestOptions['headers']['dictionary'] = dictionaryName
        }

        const path = '/dictionary/readefinitions';
        const response = await makeRdfnRequest(path, 'DELETE', deleteRequestOptions.headers, deleteBody);
        await response.json();
      }

      let addBody = {
        [dictionaryType]: {
          readefinitions: {
            [newOriginal]: {
              target: newTarget
            }
          }
        }
      }
      if (newDefinition !== '') {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        addBody[dictionaryType]['readefinitions'][newOriginal]['definition'] = newDefinition
      }
      else {
        if (originalDefinition !== '') {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          addBody[dictionaryType]['readefinitions'][newOriginal]['definition'] = newDefinition
        }
      }
      if (newLink !== '') {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        addBody[dictionaryType]['readefinitions'][newOriginal]['link'] = newLink
      }
      else {
        if (originalLink !== '') {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          addBody[dictionaryType]['readefinitions'][newOriginal]['link'] = newLink
        }
      }

      if (dictionaryType === 'addon') {
        // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
        addBody['addon']['addonName'] = dictionaryName
      }

      let addRequestOptions = {
        method: 'PUT',
        headers: {},
        body: JSON.stringify(addBody),
        redirect: 'follow'
      };

      const path = '/dictionary/readefinitions';
      const add_response = await makeRdfnRequest(path, 'PUT', addRequestOptions.headers, addBody);
      const add_data = await add_response.json();
      add_data.sort((a: any, b: any) => a.original.localeCompare(b.original, undefined, { sensitivity: 'base' }))
      setDictionaryContent(add_data)
      let output = '';
      for (let i in add_data) {
        output = output + add_data[i]['original'] + "\t" + add_data[i]['target'] + "\t" + (add_data[i]['definition'] ? add_data[i]['definition'] : '') + "\t" + (add_data[i]['link'] ? add_data[i]['link'] : '') + "\n"
      }
      setSubmittingEdit(false);
      setSaving(false);
      setDownloadLink("data:text/tab-separated-values," + encodeURIComponent(output));
      context.closeModal(id);
      showToastMessage("Readefinition updated!", "success")
    }
  }

  return (
    <form onSubmit={submitNewReadefinition} id="addwordtod-form">

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
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          value={target}
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
          }} w={"100%"} m={'20px 0px 0'} autoContrast loading={submittingEdit} variant="filled" type='submit' color='rdfnyellow.6' size="md" radius="md">Update</Button>
    </form>
  )
}

export default EditReadefinition