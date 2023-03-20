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

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState("");

  return (
    <VStack spacing="5px" bg="red.50">
      <FormControl p="4" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Full name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl p="4" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Full Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl p="4" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type={"password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <FormControl p="4" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type={"password"}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
      </FormControl>

      <FormControl p="4">
        <FormLabel>Profile Pic</FormLabel>
        <Input type={"file"} placeholder="Profile Pic" />
      </FormControl>

      <FormControl isRequired pb="4">
        <Button
          colorScheme="green" //onClick={submitHandler}
        >
          Sign up
        </Button>
      </FormControl>
    </VStack>
  );
}

export default Signup;
