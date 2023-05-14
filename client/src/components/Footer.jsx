import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box w={"full"} p={5} opacity={0.5} textAlign={"center"}>
      <Text>Designed and Developed by Jitender</Text>
      <Text>Made with &#10084;</Text>
      <Text>{year}</Text>
    </Box>
  );
};

export default Footer;
