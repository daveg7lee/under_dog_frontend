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
import { FaEnvelope, FaLock, FaUserAlt, FaUserSecret } from "react-icons/fa";
import { SignUp } from "../api";
import { JWT_TOKEN, setCookie } from "../cookie";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  email: string;
  password: string;
}

export default function SignUpModal({ onClose, isOpen }: SignUpModalProps) {
  const { register, handleSubmit } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(SignUp, {
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

  const onSubmit = ({ password, name, email }: IForm) => {
    mutation.mutate({
      email,
      name,
      password,
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)} pb={10}>
          <VStack>
            <InputGroup>
              <InputLeftElement>
                <Box color="gray.500">
                  <FaUserSecret />
                </Box>
              </InputLeftElement>
              <Input
                {...register("name", { required: true })}
                placeholder="name"
                variant="filled"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement>
                <Box color="gray.500">
                  <FaEnvelope />
                </Box>
              </InputLeftElement>
              <Input
                {...register("email", { required: true })}
                placeholder="email"
                variant="filled"
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <Box color="gray.500">
                  <FaLock />
                </Box>
              </InputLeftElement>
              <Input
                {...register("password", { required: true })}
                placeholder="password"
                variant="filled"
                type="password"
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            w="full"
            colorScheme="red"
            mt={4}
            type="submit"
          >
            Sign Up
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
