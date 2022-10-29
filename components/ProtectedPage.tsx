import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useUser from "../lib/useUser";

interface IProtectedPageProps {
  children: ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { userLoading, isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        router.push("/");
      }
    }
  }, [userLoading, isLoggedIn, router]);

  return <>{children}</>;
}
