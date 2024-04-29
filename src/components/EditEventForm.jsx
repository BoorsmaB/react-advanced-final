import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

const EditEventForm = ({ isOpen, onClose, event }) => {
  const toast = useToast();
  const [editedEvent, setEditedEvent] = useState(null); // Initialize with null

  // Update state when event prop changes
  useEffect(() => {
    setEditedEvent(event);
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editedEventData = { ...editedEvent }; // Create a copy of editedEvent
      const response = await fetch(
        `http://localhost:3000/events/${editedEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedEventData), // Use the copy in the request body
        }
      );
      if (response.ok) {
        // If update is successful, close the modal and show success toast
        onClose();
        toast({
          title: "Event updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error("Failed to update event");
        // Show error toast
        toast({
          title: "Error",
          description: "Failed to update event",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      // Show error toast
      toast({
        title: "Error",
        description: "An error occurred while updating event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // If event is not yet available, return null to avoid rendering the modal
  if (!editedEvent) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={editedEvent.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={editedEvent.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              name="startTime"
              value={editedEvent.startTime}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              name="endTime"
              value={editedEvent.endTime}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEventForm;
