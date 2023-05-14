import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { useGetMembersQuery } from "../features/team/teamSlice";

const Header = () => {
  const {
    data: users,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetMembersQuery({ refetchOnMountOrArgChange: true });

  if (isGetLoading) {
    return;
  }
  if (isGetError) {
    return;
  }

  return (
    <Box
      pos={"sticky"}
      top={"0"}
      zIndex={"2"}
      w={"100%"}
      bgGradient="linear(to-r, red.600, purple.500)"
      color={"white"}
      px={{ base: "1", sm: "2" }}
      py={5}
    >
      <Flex justify={"space-between"} align={"center"} gap={5}>
        <Link to={"/"}>
          <Flex align={"center"} gap={2}>
            <Image w={"12"} src={logo} alt="logo" />
            <Heading>Heliverse</Heading>
          </Flex>
        </Link>
        <Link to={"/customTeam"}>
          <Tooltip hasArrow label={"Link for Custom Team Page"}>
            <Flex>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Team
              </Text>
              <Box
                bg={"red.400"}
                color={"white"}
                px={2}
                borderRadius={"50%"}
                pos={"relative"}
                top={"-3"}
                right={"2"}
              >
                {users.length}
              </Box>
            </Flex>
          </Tooltip>
        </Link>
      </Flex>
    </Box>
  );
};

export default Header;
