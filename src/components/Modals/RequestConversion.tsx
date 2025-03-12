import { Button, Stack, Textarea, TextInput, Center, Text } from '@mantine/core';
import classes from './SharedModalStyles.module.css';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AnimatedCheckmark from './AnimatedCheckmark';

function RequestConversion() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [requesting, setRequesting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { makeRdfnRequest } = useAuth();

  const requestConversion = async (e: any) => {
    e.preventDefault();

    if (category === "" || description === "") {
      return;
    }

    setRequesting(true);
    const raw = await makeRdfnRequest('/requestConversion', 'POST', {}, { category, description });
    if (raw.ok) {
      setRequesting(false);
      setCategory('');
      setDescription('');
      setSubmitted(true);
    } else {
      setRequesting(false);
      // Optionally handle errors here
    }
  };

  if (submitted) {
    return (
      <Center style={{ flexDirection: 'column', padding: '20px' }}>
        <AnimatedCheckmark />
        <Text>We got your request!</Text>
      </Center>
    );
  }

  return (
    <form onSubmit={requestConversion}>
      <Stack gap="md">
        <TextInput
          placeholder="Conversion Category"
          required
          value={category}
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Textarea
          placeholder="Conversion Description"
          value={description}
          required
          classNames={{
            root: classes.inputRoot,
            input: classes.input
          }}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Stack>
      <Button
        classNames={{
          root: classes.buttonRoot,
          label: classes.buttonLabel
        }}
        w="100%"
        m="20px 0px 0"
        autoContrast
        loading={requesting}
        variant="filled"
        type="submit"
        color="rdfnyellow.6"
        radius="md"
      >
        Request Conversion
      </Button>
    </form>
  );
}

export default RequestConversion;
