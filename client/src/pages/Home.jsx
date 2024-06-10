import {Box, Heading, Button, Center} from '@chakra-ui/react'


export default function Home() {
  return (
    <Box p='4' textAlign={'Center'}>
      <Heading>Home</Heading>
      <Button colorScheme='teal'>Sign in</Button>
      <Button colorScheme='teal'>Sign up</Button>                
    </Box>  
  );
}

