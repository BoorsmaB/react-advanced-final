import React, { useState, useEffect } from "react";
import { Select, Flex } from "@chakra-ui/react";

const FilterBar = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Flex
      alignItems="center"
      my={0}
      bg="white"
      maxWidth="200px" // Adjust the maxWidth as needed
      mx="auto" // Center the FilterBar horizontally
      px={0} // Add horizontal padding
      borderRadius="md" // Add border radius for styling
      boxShadow="md" // Add box shadow for styling
    >
      <Select
        value={selectedCategory}
        onChange={onCategoryChange}
        width="100%"
        mr={4}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {capitalizeFirstLetter(category.name)}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default FilterBar;
