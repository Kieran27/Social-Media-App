import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

const useRequireAuth = () => {
  // hooks
  const { user } = useAuth();
  const router = useRouter();

  // If user is null redirect
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  return user;
};

export default useRequireAuth;
