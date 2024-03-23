"use client";
import { Button } from "@repo/ui/components/ui/button";

const LogoutButton = () => {
  const handleLogout = () => {
    // logout()
    //   .then(() => {
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  return <Button onClick={handleLogout}>로그아웃</Button>;
};

export default LogoutButton;
