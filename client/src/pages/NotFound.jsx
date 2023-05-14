import { Flex, Image } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      w={{ sm: "sm", md: "md", lg: "lg", xl: "xl" }}
      h={"88vh"}
      mx={"auto"}
    >
      <Image src="./../../noPageFound.jpg" alt="Not Found" />
    </Flex>
  );
};

export default NotFound;
