import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, STATUSES } from "../features/users/getUsersSlice";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import Filters from "../components/Filters";
import {
  useAddMemberMutation,
  useGetMembersQuery,
} from "../features/team/teamSlice";

const Home = () => {
  const { users, status } = useSelector((state) => state.getUsers);
  const { page, totalUsers } = useSelector((state) => state.pagination);
  const [limit, setLimit] = useState(20);
  const { domains, genders, availables, search } = useSelector(
    (state) => state.getProps
  );
  const [addMember, response] = useAddMemberMutation();

  const {
    data: team,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetMembersQuery({ refetchOnMountOrArgChange: true });

  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({ page, limit }));
  }, [page, limit, dispatch]);

  let filtered = users;
  let one=team;
  const handleAdd = (user) => {
    const verify = one.filter((ele) => ele.id === user.id);
     
     if (one.length === 0) {
       addMember(user);
       toast({
         title: "User Added Successfully",
         status: "success",
         duration: 1000,
         isClosable: true,
       });
     } else if (verify.length !== 0) {
       toast({
         title: "User Already Exits",
         status: "info",
         duration: 1000,
         isClosable: true,
       });
     } else {
       addMember(user);
       toast({
         title: "User Added Successfully",
         status: "success",
         duration: 1000,
         isClosable: true,
       });
     }
  };

  //****************************************************************************************** */
  //----------------------------------Fitering Start-----------------------------------------------------
  //**************************************************************************************** */
  if (search) {
    filtered = users.filter((user) => {
      return Object.values(user).join(" ").toLowerCase().includes(search.toLowerCase())
    });
  }
  if (domains) {
    filtered = users.filter((ele) => ele.domain === domains);
  }
  if (genders) {
    filtered = users.filter((ele) => ele.gender === genders);
  }
  if (availables) {
    filtered = users.filter((ele) => ele.available.toString() === availables);
  }
  if (domains && genders) {
    filtered = users
      .filter((ele) => ele.domain === domains)
      .filter((ele) => ele.gender === genders);
  }
  if (genders && availables) {
    filtered = users
      .filter((ele) => ele.domain === domains)
      .filter((ele) => ele.gender === genders)
      .filter((ele) => ele.available.toString() === availables);
  }
  if (domains && availables) {
    filtered = users
      .filter((ele) => ele.domain === domains)
      .filter((ele) => ele.available.toString() === availables);
  }
  if (domains && genders && availables) {
    filtered = users
      .filter((ele) => ele.domain === domains)
      .filter((ele) => ele.gender === genders)
      .filter((ele) => ele.available.toString() === availables);
  }

  //****************************************************************************************** */
  //---------------------------------Fitering End------------------------------------------------------
  //**************************************************************************************** */

if(status===STATUSES.LOADING){
  return <Loading />
}

  if (status === STATUSES.ERROR) {
    return (
      <Flex flexDir={"column"} justify={"center"} align={"center"}>
        <Heading>ERROR 404</Heading>
        <Heading>Something went wrong!</Heading>
      </Flex>
    );
  }

  return (
    <Box>
      <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
        Home
      </Text>
      <Filters />
      <Box bg={"blackAlpha.300"}>
        <Pagination limit={limit} />
        <Flex p={3} justify={"center"} align={"center"} gap={2}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Users/page:
          </Text>
          <Select
            w={"24"}
            name="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value={totalUsers}>{totalUsers}</option>
          </Select>
        </Flex>
        <Center>
          {status === STATUSES.LOADING ? (
            <Loading />
          ) : (
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
              {filtered &&
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
                          <Flex gap={2} align={"center"}>
                            <Image
                              src={user?.avatar}
                              alt={user?.first_name + " " + user?.last_name}
                              borderRadius="lg"
                            />
                            {user?.available ? (
                              <Button onClick={() => handleAdd(user)}>
                                ➕ Add
                              </Button>
                            ) : null}
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
          )}
        </Center>
      </Box>
      <Pagination limit={limit} />
    </Box>
  );
};

export default Home;
