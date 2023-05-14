import {
  Badge,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Loading from "../components/Loading";
import Filters from "../components/Filters";
import {
  useGetMembersQuery,
  useDeleteMemberMutation,
} from "../features/team/teamSlice";
import NoUsers from "../components/NoUsers";
import { useSelector } from "react-redux";

const CustomTeam = () => {
  const { domains, genders, availables, search } = useSelector(
    (state) => state.getProps
  );
  const [deleteMember, response] = useDeleteMemberMutation();
  const toast = useToast();
  const {
    data: costomUsers,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetMembersQuery({ refetchOnMountOrArgChange: true });

  if (isGetLoading) {
    return <Loading />
  } else if (isGetError) {
    return (
      <Flex flexDir={"column"} justify={"center"} align={"center"}>
        <Heading>ERROR 404</Heading>
        <Heading>Something went wrong!</Heading>
      </Flex>
    );
  }

  let filtered = costomUsers;

  const handleDelete = (id) => {
    deleteMember(id);
    toast({
      title: "User removed",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  //****************************************************************************************** */
  //----------------------------------Fitering Start-----------------------------------------------------
  //**************************************************************************************** */
  if (search) {
    filtered = costomUsers.filter((ele) => ele.first_name.toLowerCase() === search);
  }
  if (domains) {
    filtered = costomUsers.filter((ele) => ele.domain === domains);
  }
  if (genders) {
    filtered = costomUsers.filter((ele) => ele.gender === genders);
  }
  if (availables) {
    filtered = costomUsers.filter((ele) => ele.available.toString() === availables);
  }
  if (domains && genders) {
    filtered = costomUsers
      .filter((ele) => ele.domain === domains)
      .filter((ele) => ele.gender === genders);
  }
  if (genders && availables) {
    filtered = costomUsers
      .filter((ele) => ele.domain === domains)
      .filter((ele) => ele.gender === genders)
      .filter((ele) => ele.available.toString() === availables);
  }
  if (domains && availables) {
    filtered = costomUsers
      .filter((ele) => ele.domain === domains)
      .filter((ele) => ele.available.toString() === availables);
  }
  if (domains && genders && availables) {
    filtered = costomUsers
      .filter((ele) => ele.domain === domains)
      .filter((ele) => ele.gender === genders)
      .filter((ele) => ele.available.toString() === availables);
  }

  //****************************************************************************************** */
  //---------------------------------Fitering End------------------------------------------------------
  //**************************************************************************************** */

  return (
    <main>
      <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
        Team
      </Text>
      <Filters />
      <Center bg={"blackAlpha.300"}>
        <Grid
          p={5}
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
            xl: "repeat(3,1fr)",
            "2xl": "repeat(4,1fr)",
          }}
        >
          {isGetSuccess &&
            filtered?.map((user) => {
              return (
                <GridItem key={user.id} p={5}>
                  <Card p={3} maxW="sm" border={"2px"} borderColor={"black"}>
                    <Badge
                      ml="1"
                      colorScheme="green"
                      w={"fit-content"}
                      pos={"absolute"}
                      top={3}
                      right={3}
                    >
                      {user?.available ? "Available" : ""}
                    </Badge>
                    <CardBody>
                      <Flex align={"center"} gap={2}>
                        <Image
                          src={user?.avatar}
                          alt={user?.first_name + " " + user?.last_name}
                          borderRadius="lg"
                        />
                        <Button
                          colorScheme={"red"}
                          onClick={() => handleDelete(user.id)}
                        >
                          Remove
                        </Button>
                      </Flex>
                      <Stack mt="6" spacing="3">
                        <Heading size="md">
                          {user?.first_name + " " + user?.last_name}
                        </Heading>
                        <Text>{user?.email}</Text>
                        <Text>{user?.gender}</Text>
                        <Text color="blue.600" fontSize="xl">
                          {user?.domain}
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
        </Grid>
      </Center>
      {filtered.length === 0 && <NoUsers />}
    </main>
  );
};

export default CustomTeam;
