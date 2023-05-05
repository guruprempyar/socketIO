import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState("");

  const submitHandler = async () => {
    setLoading(true);
    if (
      !name ||
      !email ||
      !password ||
      !confirmpassword ||
      password !== confirmpassword
    ) {
      toast({
        title: "Please fill the required form.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const userData = await axios.post(
        "api/user/",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Account created",
        description: "The new account created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("userinfo", JSON.stringify(userData));
      navigate("/chats");
      setLoading(false);
    } catch (err) {
      console.log("err msg:", err.response);
      toast({
        title: err.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

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
        <Button isLoading={loading} colorScheme="green" onClick={submitHandler}>
          Sign up
        </Button>
      </FormControl>
    </VStack>
  );
}

export default Signup;
