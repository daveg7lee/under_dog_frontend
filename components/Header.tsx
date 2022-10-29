import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { JWT_TOKEN, removeCookie } from "../cookie";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import UnderdogModal from "./UnderdogModal";

export default function Header() {
  const queryClient = useQueryClient();
  const { isLoggedIn, user, userLoading } = useUser();

  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const {
    isOpen: isUnderdogOpen,
    onClose: onUnderdogClose,
    onOpen: onUnderdogOpen,
  } = useDisclosure();

  const onLogOut = async () => {
    removeCookie(JWT_TOKEN);
    queryClient.refetchQueries(["me"]);
  };

  return (
    <Stack
      py="5"
      px="40"
      borderBottomWidth={1}
      justifyContent="space-between"
      direction={{ sm: "column", md: "row" }}
      alignItems="center"
      spacing={{ sm: 4, md: 0 }}
    >
      <Link href="/">
        <Text fontSize="2xl" fontWeight="bold">
          Under Dog
        </Text>
      </Link>
      <Box>
        <InputGroup>
          <Input placeholder="찾고싶은 프로젝트 명을 검색하세요!" />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>
      </Box>
      <HStack spacing={2}>
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <Button onClick={onSignUpOpen} colorScheme={"green"}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Text fontWeight="medium">{user?.points} 포인트</Text>
              <Menu>
                <MenuButton>
                  <Avatar size={"sm"} name={user?.name} src={user?.avatarUrl} />
                </MenuButton>
                <MenuList>
                  <Link href="/me">
                    <MenuItem>마이페이지</MenuItem>
                  </Link>
                  {!user?.underdog ? (
                    <MenuItem onClick={onUnderdogOpen}>
                      언더독 지원하기
                    </MenuItem>
                  ) : (
                    <Link href={`/underdog/${user.underdog.name}`}>
                      <MenuItem>언더독 페이지</MenuItem>
                    </Link>
                  )}
                  <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
                </MenuList>
              </Menu>
            </>
          )
        ) : (
          <SkeletonCircle size="8" />
        )}
      </HStack>
      <LoginModal onClose={onLoginClose} isOpen={isLoginOpen} />
      <SignUpModal onClose={onSignUpClose} isOpen={isSignUpOpen} />
      <UnderdogModal onClose={onUnderdogClose} isOpen={isUnderdogOpen} />
    </Stack>
  );
}
