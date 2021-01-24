import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

/*
  A Chakra Box with some children
*/

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  const bg = useColorModeValue("whitesmoke", "indigo.500");
  const color = useColorModeValue("black", "white");
  return (
    <Box
      mt={8}
      maxW={variant === "regular" ? "900px" : "400px"}
      w="100%"
      bg={bg}
      color={color}
      p={5}
      borderRadius="md"
      boxShadow="md"
    >
      {children}
    </Box>
  );
};
