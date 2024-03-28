"use client";
import { useEffect, useState } from "react";
import { ShoppingBag, LogIn } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@repo/ui/components/ui/button";
import useCart from "@hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import LogoutButton from "./LogoutButton";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cart = useCart();
  const { isLoading, user } = useCurrentUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!user && isLoading)
    return <Skeleton className="w-[150px] h-10 rounded-full" />;

  return (
    <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-x-2">
      {user ? (
        <>
          <Button
            onClick={() => router.push("/cart")}
            className="flex items-center w-[80px] rounded-full bg-black px-4 py-2"
          >
            <ShoppingBag size={20} color="white" />
            <span className="ml-2 text-sm font-medium text-white">
              {cart.items.length}
            </span>
          </Button>
          <LogoutButton className="flex items-center w-[80px] rounded-full bg-black px-4 py-2" />
        </>
      ) : (
        <Button
          onClick={() =>
            router.push(
              `${process.env.NEXT_PUBLIC_ACCOUNT_URL}/login?callbackUrl=${process.env.NEXT_PUBLIC_HOST}${pathname}`
            )
          }
          className="flex items-center w-[100px] rounded-full bg-black px-4 py-2"
        >
          <LogIn size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">로그인</span>
        </Button>
      )}
    </div>
  );
};

export default NavbarActions;
