import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { emailLogIn } from "../api";
import { JWT_TOKEN, setCookie } from "../cookie";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  email: string;
  password: string;
}

export default function LoginModal({ onClose, isOpen }: LoginModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation(emailLogIn, {
    onSuccess: (res) => {
      toast({ status: "success", title: "Welcome!" });
      setCookie(JWT_TOKEN, `Bearer ${res.token}`);
      onClose();
      queryClient.refetchQueries(["me"]);
    },
    onError: ({
      response: {
        data: { error },
      },
    }) => {
      toast({ status: "error", title: error });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const toast = useToast();

  const onSubmit = async ({ email, password }: IForm) => {
    mutation.mutate({ email, password });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)} pb={10}>
          <VStack>
            <InputGroup>
              <InputLeftElement>
                <Box color="gray.500">
                  <FaUserAlt />
                </Box>
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.email?.message)}
                placeholder="email"
                variant="filled"
                {...register("email", {
                  required: "Please write a email",
                })}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <Box color="gray.500">
                  <FaLock />
                </Box>
              </InputLeftElement>
              <Input
                isInvalid={Boolean(errors.password?.message)}
                placeholder="password"
                variant="filled"
                type="password"
                {...register("password", {
                  required: "Please write a password",
                })}
              />
            </InputGroup>
          </VStack>
          <Button type="submit" w="full" colorScheme="red" mt={4}>
            Log in
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
