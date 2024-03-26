"use client";
import { Button } from "@repo/ui/components/ui/button";

const LogoutButton = () => {
  return (
    <a href={`${process.env.AUTH_URL}/signout`}>
      <Button>로그아웃</Button>
    </a>
  );
};

export default LogoutButton;
