"use client";
import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const LogoutButton = ({ className }: IProps) => {
  const router = useRouter();

  const logout = () => {
    router.push(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/api/auth/signout`);
  };
  return (
    <Button variant="secondary" onClick={logout} className={`${className}`}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
