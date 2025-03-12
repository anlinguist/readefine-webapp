import { Button, Stack, TextInput } from '@mantine/core';
import { useContext, useState } from 'react'
import { RDFNContext } from '../../RDFNContext';
import classes from './SharedModalStyles.module.css';
import { ContextModalProps } from '@mantine/modals';

const CreateNewAITarget = ({
  context,
  id
}: ContextModalProps<any>) => {
  // @ts-expect-error TS(2339): Property 'updateTargets' does not exist on type 'unkn... Remove this comment to see the full error message
  const { updateTargets, chosenAIStyle } = useContext(RDFNContext);
  const [name, setName] = useState('');
  const [addingStyle, setAddingStyle] = useState(false);

  const create = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingStyle(true);
    const msg = `Added ${name} target`;
    await updateTargets(name, "PUT", msg);
    setAddingStyle(false);
    context.closeModal(id);
  }
  return (
    <form id="addwordtod-form" onSubmit={create}>

      <Stack gap={'md'}>
        <TextInput
          placeholder="Style name"
          required
          value={chosenAIStyle}
          disabled
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
        />

        <TextInput
          placeholder="New target name"
          value={name}
          required
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          onChange={(e) => setName(e.target.value)}
        />
      </Stack>

      <Button  
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel
          }} w={"100%"} m={'20px 0px 0'} autoContrast loading={addingStyle} variant="filled" type='submit' color='rdfnyellow.6' size="md" radius="md">Add</Button>
    </form>
  )
}

export default CreateNewAITarget