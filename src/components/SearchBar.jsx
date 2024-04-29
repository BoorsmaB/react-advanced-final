import React from "react";
import { Input, Flex } from "@chakra-ui/react";

const SearchBar = ({ searchQuery, onSearchInputChange }) => {
  return (
    <Flex alignItems="center" my={4} bg="white">
      <Input
        type="text"
        value={searchQuery}
        onChange={onSearchInputChange}
        placeholder="Search events..."
        mr={4}
      />
    </Flex>
  );
};

export default SearchBar;
