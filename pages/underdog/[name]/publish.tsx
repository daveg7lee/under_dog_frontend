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
  ticket_price: number;
  fundingDueDate: string;
  fundingReward: string;
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

  const onSubmit = ({
    title,
    detail,
    goal_amount,
    categoryId,
    ticket_price,
    fundingDueDate,
    fundingReward,
  }: IForm) => {
    mutation.mutate({
      title,
      detail,
      goal_amount,
      categoryId,
      ticket_price,
      fundingDueDate,
      fundingReward,
    });
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
        <Input
          {...register("title", { required: true })}
          placeholder="프로젝트 제목"
        />
        <Textarea
          {...register("detail", { required: true })}
          placeholder="상세 설명"
        />
        <Input
          type="number"
          {...register("goal_amount", { required: true })}
          placeholder="목표 금액"
        />
        <Input
          type="number"
          {...register("ticket_price", { required: true })}
          placeholder="티켓 개당 금액"
        />
        <Input
          type="date"
          {...register("fundingDueDate", { required: true })}
          placeholder="펀딩 기간"
        />
        <Textarea
          {...register("fundingReward", { required: true })}
          placeholder="펀딩 리워드"
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
