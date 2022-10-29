import {
  Button,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { createProject, getCategories, getUnderdog } from "../../../api";
import UnderdogProfileComponent from "../../../components/UnderdogProfileComponent";
import { ICategory } from "../../../types";

interface IForm {
  title: string;
  detail: string;
  goal_amount: number;
  categoryId: number;
}

export default function PublishProject() {
  const router = useRouter();
  const { name } = router.query;
  const { register, handleSubmit } = useForm<IForm>();
  const { data } = useQuery(["underdog", name], getUnderdog, {
    enabled: !!name,
  });
  const { data: categoriesData } = useQuery(["categories"], getCategories);
  const toast = useToast();
  const mutation = useMutation(createProject, {
    onSuccess: () => {
      toast({ status: "success", title: "프로젝트가 등록되었습니다!" });
    },
    onError: ({
      response: {
        data: { error },
      },
    }) => {
      toast({ status: "error", title: error });
    },
  });

  const onSubmit = ({ title, detail, goal_amount, categoryId }: IForm) => {
    mutation.mutate({ title, detail, goal_amount, categoryId });
  };

  return (
    <UnderdogProfileComponent name={data?.underdog.name}>
      <Heading mb={5}>프로젝트 등록</Heading>
      <VStack
        as="form"
        w="full"
        px={100}
        spacing={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register("title")} placeholder="프로젝트 제목" />
        <Textarea {...register("detail")} placeholder="상세 설명" />
        <Input
          type="number"
          {...register("goal_amount")}
          placeholder="목표 금액"
        />
        <Select {...register("categoryId")}>
          {categoriesData?.categories.map((category: ICategory) => (
            <option value={category.id} key={category.id}>
              {category.title}
            </option>
          ))}
        </Select>
        <Button
          type="submit"
          isLoading={mutation.isLoading}
          colorScheme={"green"}
          w="full"
        >
          등록
        </Button>
      </VStack>
    </UnderdogProfileComponent>
  );
}
