import { Avatar, Button, Divider, Grid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import OwnerOnlyPage from "./OwnerOnlyPage";
import ProtectedPage from "./ProtectedPage";

interface IUnderdogProfileComponentProps {
  children: ReactNode;
  name: string | undefined;
}

export default function UnderdogProfileComponent({
  children,
  name,
}: IUnderdogProfileComponentProps) {
  return (
    <ProtectedPage>
      <OwnerOnlyPage>
        <Grid
          templateColumns="1fr 4fr"
          gap={8}
          px={{ base: 10, lg: 40 }}
          mt={10}
        >
          <VStack spacing={3}>
            <Avatar size={"xl"} />
            <VStack spacing={0}>
              <Text fontSize="2xl" fontWeight="bold">
                {name}
              </Text>
              <Text color="gray">언더독</Text>
            </VStack>
            <Divider />
            <Link href={`/underdog/${name}`}>
              <Button variant="ghost">프로필 관리</Button>
            </Link>
            <Link href={`/underdog/${name}/publish`}>
              <Button variant="ghost">프로젝트 등록</Button>
            </Link>
            <Link href={`/underdog/${name}/admin`}>
              <Button variant="ghost">프로젝트 관리</Button>
            </Link>
            <Link href={`/underdog/${name}/video`}>
              <Button variant="ghost">제작물 업로드</Button>
            </Link>
            <Link href={`/underdog/${name}/transfer`}>
              <Button variant="ghost">환전</Button>
            </Link>
          </VStack>
          <VStack>{children}</VStack>
        </Grid>
      </OwnerOnlyPage>
    </ProtectedPage>
  );
}
