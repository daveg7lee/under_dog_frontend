import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { createUnderdog } from "../api";

interface UnderdogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  members: string;
  experiences: string;
  scenario: string;
  ability: string;
  bio: string;
}

export default function UnderdogModal({ onClose, isOpen }: UnderdogModalProps) {
  const { register, handleSubmit } = useForm<IForm>();
  const router = useRouter();
  const toast = useToast();
  const mutation = useMutation(createUnderdog, {
    onSuccess: () => {
      toast({
        title: "축하합니다! 언더독의 대표가 되셨습니다!",
        status: "success",
      });

      router.push("/");
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
    name,
    members,
    experiences,
    scenario,
    ability,
    bio,
  }: IForm) => {
    mutation.mutate({ name, members, experiences, scenario, ability, bio });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>언더독 신청서</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)} pb={10}>
          <VStack spacing={3} mb={3}>
            <Input
              {...register("name", { required: true })}
              placeholder="언더독 이름"
              variant="filled"
            />
            <Textarea
              placeholder="언더독 소개"
              {...register("bio", { required: true })}
              variant="filled"
            />
            <Input
              {...register("members", { required: true })}
              placeholder="멤버"
              variant="filled"
            />
            <Textarea
              {...register("experiences", { required: true })}
              placeholder="제작 경험"
              variant="filled"
            />
            <Textarea
              {...register("scenario", { required: true })}
              placeholder="제작 시나리오"
              variant="filled"
            />
            <Input
              {...register("ability", { required: true })}
              placeholder="제작 역량"
              variant="filled"
            />
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            w="full"
            colorScheme="red"
            mt={4}
            type="submit"
          >
            신청하기
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
