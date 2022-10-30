import { HStack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <HStack
      mt={10}
      py={8}
      justifyContent="center"
      alignItems="center"
      borderTopWidth={1}
    >
      <Text color="gray">Under Dog &copy; 2022</Text>
    </HStack>
  );
}
