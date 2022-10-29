import {
  Avatar,
  Box,
  Button,
  Grid,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { fundProject, getProject } from "../../api";

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState(1);
  const { data } = useQuery(["project", id], getProject, {
    enabled: !!id,
  });
  const mutation = useMutation(fundProject, {
    onSuccess: () => {
      toast({ status: "success", title: "티켓이 구매되었습니다!" });
      queryClient.refetchQueries(["me"]);
      queryClient.refetchQueries(["project", id]);
    },
    onError: ({
      response: {
        data: { error },
      },
    }) => {
      toast({ status: "error", title: error });
    },
  });

  return (
    <Grid templateColumns="2fr 1fr" px={{ base: 10, lg: 40 }} mt={10} gap={5}>
      <Text>{data?.project?.detail}</Text>
      <VStack spacing={10}>
        <VStack
          p={5}
          w="full"
          spacing={5}
          border="2px"
          borderColor="gray.100"
          borderRadius="8px"
        >
          <Text fontSize="xl" fontWeight="bold">
            Get {`${data?.project.author?.name}'s`} ticket!
          </Text>
          <HStack spacing={5}>
            <Box>
              <FaTicketAlt size={38} />
            </Box>
            <Button
              onClick={() => setAmount(1)}
              colorScheme="green"
              isActive={amount === 1}
            >
              1
            </Button>
            <Button
              onClick={() => setAmount(3)}
              colorScheme="green"
              isActive={amount === 3}
            >
              3
            </Button>
            <Button
              onClick={() => setAmount(5)}
              colorScheme="green"
              isActive={amount === 5}
            >
              5
            </Button>
          </HStack>
          <Button
            w="full"
            isLoading={mutation.isLoading}
            onClick={() =>
              mutation.mutate({
                amount:
                  amount *
                  (data?.project.ticket_price
                    ? data?.project.ticket_price
                    : 1000),
                id,
              })
            }
          >
            {amount *
              (data?.project.ticket_price ? data?.project.ticket_price : 1000)}
            원 후원하기
          </Button>
          <HStack w="full">
            <Button w="full">공유하기</Button>
            <Button w="full">찜하기</Button>
          </HStack>
        </VStack>
        <VStack
          p={5}
          w="full"
          spacing={5}
          border="2px"
          borderColor="gray.100"
          borderRadius="8px"
        >
          {data?.project?.investors?.map((invest) => (
            <HStack key={invest.id} w="full">
              <Avatar
                size="sm"
                name={invest.investor.name}
                src={invest.investor.avatarUrl}
              />
              <Text>{invest.investor.name}님이 티켓을 구매하셨습니다.</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Grid>
  );
}
