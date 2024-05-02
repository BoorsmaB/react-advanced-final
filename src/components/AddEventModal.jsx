import React, { useState } from "react";
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
  Textarea,
} from "@chakra-ui/react";

const AddEventModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    starttime: "",
    endtime: "",
    image: null, // New state for image upload
  });

  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const selectedFile = files[0];
      // Check if the selected file is an image
      if (selectedFile && selectedFile.type.startsWith("image/")) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: selectedFile,
        }));
        // Display image preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // Handle invalid file type
        console.error("Invalid file type. Please select an image file.");
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("starttime", formData.starttime);
      formDataToSend.append("endtime", formData.endtime);
      formDataToSend.append("image", formData.image);

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        console.log("Event added successfully:", formData);
        onClose();
      } else {
        console.error("Error adding event:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              resize="vertical"
              minHeight="120px"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              name="starttime"
              value={formData.starttime}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              name="endtime"
              value={formData.endtime}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Image</FormLabel>
            <Input type="file" name="image" onChange={handleChange} />
          </FormControl>
          {/* Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                marginTop: "10px",
              }}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
