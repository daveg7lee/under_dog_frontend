import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useUser from "../lib/useUser";

interface IOwnerOnlyPageProps {
  children: ReactNode;
}

export default function OwnerOnlyPage({ children }: IOwnerOnlyPageProps) {
  const { userLoading, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading) {
      if (!user?.underdog) {
        router.push("/");
      }
    }
  }, [userLoading, user, router]);

  return <>{children}</>;
}
