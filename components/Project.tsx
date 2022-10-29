import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { IProject } from "../types";

interface IProjectProps {
  project: IProject;
}

export default function Project({ project }: IProjectProps) {
  return (
    <Link href={`/${project.author.name}/${project.id}`}>
      <VStack alignItems="flex-start" key={project.id}>
        <Box overflow={"hidden"} mb={3} w="full" rounded="xl">
          {project?.imageUrl ? (
            <Image
              objectFit={"cover"}
              minH="280"
              alt="thumbnail image"
              src={project.imageUrl}
            />
          ) : (
            <Box minH="280px" h="100%" w="full" p={10} bg="green.400" />
          )}
        </Box>
        <Box>
          <Text noOfLines={1} fontSize="md" as="b">
            {project.author.name}
          </Text>
          <Text fontSize="sm">{project?.title}</Text>
        </Box>
        <HStack justifyContent="space-between" w="full">
          <Text fontSize="sm">티켓 판매 금액</Text>
          <Text fontSize="sm">{project?.current_amount}₩</Text>
        </HStack>
      </VStack>
    </Link>
  );
}
