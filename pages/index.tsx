import {
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getProjects,
  getRecommended,
  IProjectsResponse,
} from "../api";
import Project from "../components/Project";
import { ICategory } from "../types";

export default function Home() {
  const { data: recommendProjectsData, isLoading: isRecommendProjectsLoading } =
    useQuery<IProjectsResponse>(["recommended", "projects"], getRecommended);

  const { data: categoryProjectsData, isLoading: isCategoryProjectsLoading } =
    useQuery<IProjectsResponse>(["projects"], getProjects);

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery(
    ["categories"],
    getCategories
  );

  return (
    <VStack spacing={20}>
      <VStack mt={20}>
        <Text fontSize="5xl" fontWeight="extrabold">
          CREATOR를 꿈꾸는
        </Text>
        <Text fontSize="5xl" fontWeight="extrabold">
          모든 언더독들이
        </Text>
        <Text fontSize="5xl" fontWeight="extrabold">
          웩더독 하도록
        </Text>
      </VStack>
      <Tabs align="center" variant="soft-rounded" colorScheme="green" w="full">
        <TabList>
          <Tab>Recommend</Tab>
          <Tab>Category</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid
              templateColumns={{
                sm: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)",
              }}
              columnGap={6}
              rowGap={8}
              px={{ base: 10, lg: 40 }}
              mt={10}
            >
              {!isRecommendProjectsLoading &&
                recommendProjectsData?.projects.map((project) => (
                  <Project key={project.id} project={project} />
                ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Tabs
              align="center"
              variant="soft-rounded"
              colorScheme="blackAlpha"
            >
              <TabList>
                <Tab>전체</Tab>
                {!isCategoriesLoading &&
                  categoriesData?.categories.map((category: ICategory) => (
                    <Tab key={category.id}>{category.title}</Tab>
                  ))}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Grid
                    templateColumns={{
                      sm: "1fr",
                      md: "repeat(2, 1fr)",
                      lg: "repeat(3, 1fr)",
                      xl: "repeat(4, 1fr)",
                      "2xl": "repeat(5, 1fr)",
                    }}
                    columnGap={6}
                    rowGap={8}
                    px={{ base: 10, lg: 40 }}
                    mt={10}
                  >
                    {!isCategoryProjectsLoading &&
                      categoryProjectsData?.projects?.map((project) => (
                        <Project key={project.id} project={project} />
                      ))}
                  </Grid>
                </TabPanel>
                {!isCategoriesLoading &&
                  categoriesData?.categories.map((category: ICategory) => (
                    <TabPanel key={category.id}>
                      <Grid
                        templateColumns={{
                          sm: "1fr",
                          md: "repeat(2, 1fr)",
                          lg: "repeat(3, 1fr)",
                          xl: "repeat(4, 1fr)",
                          "2xl": "repeat(5, 1fr)",
                        }}
                        columnGap={6}
                        rowGap={8}
                        px={{ base: 10, lg: 40 }}
                        mt={10}
                      >
                        {!isCategoriesLoading &&
                          category?.projects.map((project) => (
                            <Project key={project.id} project={project} />
                          ))}
                      </Grid>
                    </TabPanel>
                  ))}
              </TabPanels>
            </Tabs>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
