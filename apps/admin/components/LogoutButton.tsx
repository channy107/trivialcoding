"use client";
import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const logout = () => {
    router.push(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/api/auth/signout`);
  };
  return <Button onClick={logout}>로그아웃</Button>;
};

export default LogoutButton;
