import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";

const NoUsers = () => {
  return (
    <Box m={10}>
      <Heading textAlign={"center"}>No Users</Heading>
      <Image
        w={{ sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        m={"auto"}
        src={"./../../noUser.jpg"}
        alt="NoUser"
      />
    </Box>
  );
};

export default NoUsers;
