import { useContext, useState } from 'react'
import { RDFNContext } from '../../RDFNContext'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextInput } from '@mantine/core';
import classes from './SharedModalStyles.module.css';
import { ContextModalProps } from '@mantine/modals';

const NewDictionary = ({
  context,
  id
}: ContextModalProps<any>) =>  {
  // @ts-expect-error TS(2339): Property 'dictionaryType' does not exist on type 'unkn... Remove this comment to see the full error message
  const { dictionaryType, showToastMessage } = useContext(RDFNContext)
  const { makeRdfnRequest } = useAuth();
  const [creatingDictionary, setCreatingDictionary] = useState(false);
  const navigate = useNavigate();
  const [newDictionaryName, setNewDictionaryName] = useState('');
  const createNewDictionary = async (e: any) => {
    e.preventDefault();
    setCreatingDictionary(true);
    let targetName = newDictionaryName.trim()
    if (targetName.length > 0) {
      let raw;
     if (dictionaryType === 'addon') {
        raw = {
          "addon": {
            "dictionary": targetName
          }
        };
      }
      
      const path = '/createDictionary';
      const createResp = await makeRdfnRequest(path, 'PUT', {}, raw);
      let createRespJson = await createResp.json()
      if (!createResp.ok) {
        console.log("Error creating dictionary")
        showToastMessage(createRespJson.reason, "error");
        setCreatingDictionary(false);
        return;
      }
      if (createRespJson['result'] === 'success') {
        setCreatingDictionary(false);
        showToastMessage("Dictionary created!", "success")

        if (dictionaryType === 'addon') {
          navigate(`/community-dictionaries/${encodeURI(targetName)}`)
        }
        context.closeModal(id);
      }
    }
  }

  return (
      <form onSubmit={createNewDictionary} id="createnewtd-form">
        <TextInput
          placeholder="New Dictionary Name"
          value={newDictionaryName}
          required
          w={"100%"}
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          onChange={(e) => setNewDictionaryName(e.target.value)}
        />

        <Button  
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel
          }} w={"100%"} m={'20px 0px 0'} autoContrast loading={creatingDictionary} variant="filled" type='submit' color='rdfnyellow.6' size="md" radius="md">Create</Button>
      </form>
  )
}

export default NewDictionary