import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    // Define your color palette here
    primary: "#007bff",
    secondary: "#6c757d",
    // Add more colors as needed
    background: "#a7d3fa",
  },
  fonts: {
    // Define your font stack here
    body: "Arial, sans-serif",
    heading: "Arial, sans-serif",
    // Add more font styles as needed
  },
  // Add more theme configurations such as typography, spacing, etc.
});

export default theme;
