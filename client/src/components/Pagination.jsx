import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPages, next, prev } from "./../features/pagination/pageSlice";

const Pagination = ({ limit }) => {
  const { page, totalUsers } = useSelector((state) => state.pagination);
  const totalPages = Math.ceil(totalUsers / Number(limit));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPages(limit));
  }, [limit, dispatch]);

  return (
    <Flex justify={"center"} align={"center"} py={5}>
      <Button onClick={() => dispatch(prev())} isDisabled={page === 1}>
        ⬅️ Prev
      </Button>
      <Text fontSize={"xl"} fontWeight={"extrabold"} p={3}>
        {page + " of " + totalPages}
      </Text>
      <Button onClick={() => dispatch(next())} isDisabled={page === totalPages}>
        Next ➡️
      </Button>
    </Flex>
  );
};

export default Pagination;
