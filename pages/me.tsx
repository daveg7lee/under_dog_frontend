import { Avatar, Button, Divider, Grid, Text, VStack } from "@chakra-ui/react";
import { FaArrowRight, FaHeart, FaTicketAlt } from "react-icons/fa";
import Project from "../components/Project";
import useUser from "../lib/useUser";

export default function Me() {
  const { user, userLoading } = useUser();

  return (
    <Grid templateColumns="1fr 4fr" px={{ base: 10, lg: 40 }} mt={10}>
      <VStack spacing={3}>
        <Avatar size={"xl"} name={user?.name} src={user?.avatarUrl} />
        <VStack spacing={0}>
          <Text fontSize="2xl" fontWeight="bold">
            {user?.name}
          </Text>
          <Text color="gray">웩더독</Text>
        </VStack>
        <Divider />
        <Button
          leftIcon={<FaHeart />}
          variant="ghost"
          rightIcon={<FaArrowRight />}
        >
          찜한 항목
        </Button>
        <Button
          leftIcon={<FaTicketAlt />}
          variant="ghost"
          rightIcon={<FaArrowRight />}
        >
          티켓 충전
        </Button>
      </VStack>
      <Grid
        templateColumns={{
          sm: "1fr",
          md: "repeat(2, 1fr)",
        }}
        columnGap={6}
        rowGap={8}
      >
        {!userLoading &&
          user?.invests?.map((invest) => (
            <Project key={invest.id} project={invest.project} />
          ))}
      </Grid>
    </Grid>
  );
}
