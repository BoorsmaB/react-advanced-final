import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  useToast,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import EditEventForm from "../components/EditEventForm";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const eventData = await response.json();
        setEvent(eventData);
        const userResponse = await fetch(
          `http://localhost:3000/users/${eventData.createdBy}`
        );
        const creatorData = await userResponse.json();
        setCreator(creatorData);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({
          title: "Event deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/events");
      } else {
        console.error("Failed to delete event");
        toast({
          title: "Error",
          description: "Failed to delete event",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onCloseAlert = () => setIsDeleteAlertOpen(false);

  return (
    <Box
      p={4}
      bg="background"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="black"
      textAlign="center"
    >
      <Box maxW="md">
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Return to EventsPage"
          onClick={() => navigate("/events")}
          mb={4}
        />
        <Heading>{event?.title}</Heading>
        <Image src={event?.image} alt={event?.title} />
        <Text>{event?.description}</Text>
        <Text>
          <Text fontWeight="bold">Start Time:</Text>{" "}
          {new Date(event?.startTime).toLocaleString()} -{" "}
          <Text fontWeight="bold">End Time:</Text>{" "}
          {new Date(event?.endTime).toLocaleString()}
        </Text>
        <Text>
          <Text fontWeight="bold">Created By:</Text> {creator?.name}
        </Text>
        <Avatar src={creator?.image} alt={creator?.name} size="lg" />
        <Button onClick={handleEditClick}>Edit</Button>
        <Button
          colorScheme="red"
          ml={2}
          onClick={() => setIsDeleteAlertOpen(true)}
        >
          Delete
        </Button>

        <EditEventForm
          isOpen={isEditing}
          onClose={handleEditClose}
          event={event}
        />

        <AlertDialog
          isOpen={isDeleteAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onCloseAlert}
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&rsquo;t post undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
    </Box>
  );
};

export default EventPage;
