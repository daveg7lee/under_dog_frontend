import { Grid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getUnderdog } from "../../../api";
import Project from "../../../components/Project";
import UnderdogProfileComponent from "../../../components/UnderdogProfileComponent";

export default function UnderdogProfile() {
  const router = useRouter();
  const { name } = router.query;
  const { data } = useQuery(["underdog", name], getUnderdog, {
    enabled: !!name,
  });

  return (
    <UnderdogProfileComponent name={data?.underdog.name}>
      <Grid
        templateColumns={{
          sm: "1fr",
          md: "repeat(2, 1fr)",
        }}
        columnGap={6}
        rowGap={8}
        w="full"
      >
        {data?.underdog?.projects?.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </Grid>
    </UnderdogProfileComponent>
  );
}
