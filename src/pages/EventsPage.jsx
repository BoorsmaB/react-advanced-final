import React, { useState, useEffect } from "react";
import {
  Heading,
  Box,
  Flex,
  Image,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AddEventModal from "../components/AddEventModal";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Fetch events from backend
    // Example fetch code
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleOpenAddEventModal = () => {
    setShowAddEventModal(true);
  };

  const handleCloseAddEventModal = () => {
    setShowAddEventModal(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    // Filter events based on search query and selected category
    const categoryMatch =
      selectedCategory === "all" || event.category === selectedCategory;
    const titleMatch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return categoryMatch && titleMatch;
  });

  return (
    <Box p={4} bg="background">
      <Heading mb={4}>List of Events</Heading>
      <SearchBar
        searchQuery={searchQuery}
        onSearchInputChange={handleSearchInputChange}
      />
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Button onClick={handleOpenAddEventModal} colorScheme="blue" my={4}>
        Add Event
      </Button>
      <AddEventModal
        isOpen={showAddEventModal}
        onClose={handleCloseAddEventModal}
      />
      <Flex direction="column">
        {filteredEvents.map((event, index) => (
          <Link
            key={event.id}
            as={RouterLink}
            to={`/events/${event.id}`}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            mb={4}
          >
            <Flex
              p={4}
              bg={index % 2 === 0 ? "blue.100" : "blue.200"} // Check this line
              borderRadius="md"
              alignItems="center"
              _hover={{ bg: index % 2 === 0 ? "blue.200" : "blue.300" }}
            >
              <Image
                src={event.image}
                alt={event.title}
                boxSize="100px"
                objectFit="cover"
                mr={4}
              />
              <Box>
                <Text fontWeight="bold">{event.title}</Text>
                <Text>{event.description}</Text>
                <Text>
                  Start Time: {new Date(event.startTime).toLocaleString()} - End
                  Time: {new Date(event.endTime).toLocaleString()}
                </Text>
              </Box>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default EventsPage;
