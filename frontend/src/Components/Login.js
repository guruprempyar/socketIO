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

function Login() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
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
        "api/user/login",
        {
          email,
          password,
        },
        config
      );
      toast({
        title: "user login successfully ",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("userinfo", JSON.stringify(userData.data));
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
        <Button isLoading={loading} colorScheme="green" onClick={submitHandler}>
          Submit
        </Button>
      </FormControl>
    </VStack>
  );
}

export default Login;
