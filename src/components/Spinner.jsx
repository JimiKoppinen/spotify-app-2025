import { Spinner, Box } from "@chakra-ui/react";

export const SpinnerBar = () => {
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="1000"
    >
      <Spinner size="xl" />
    </Box>);
};