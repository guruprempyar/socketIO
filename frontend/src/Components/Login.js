import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <VStack spacing="5px" bg="teal.50">
      <FormControl isRequired p="4">
        <FormLabel>Email</FormLabel>
        <Input
          bg="white"
          placeholder="First name"
          valeu={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired p="4">
        <FormLabel>Password</FormLabel>
        <Input
          bg="white"
          type={"password"}
          valeu={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired pb="4">
        <Button
          colorScheme="green" //onClick={submitHandler}
        >
          Submit
        </Button>
      </FormControl>
    </VStack>
  );
}

export default Login;
