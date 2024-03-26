"use client";

import { ShoppingBag, LogIn } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@repo/ui/components/ui/button";
import useCart from "@hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import LogoutButton from "./LogoutButton";

const NavbarActions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useCart();
  const { isLoading, user } = useCurrentUser();

  if (isLoading) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {user ? (
        <>
          <Button
            onClick={() => router.push("/cart")}
            className="flex items-center rounded-full bg-black px-4 py-2"
          >
            <ShoppingBag size={20} color="white" />
            <span className="ml-2 text-sm font-medium text-white">
              {cart.items.length}
            </span>
          </Button>
          <LogoutButton className="flex items-center rounded-full bg-black px-4 py-2" />
        </>
      ) : (
        <Button
          onClick={() =>
            router.push(
              `${process.env.NEXT_PUBLIC_ACCOUNT_URL}/login?callbackUrl=${process.env.NEXT_PUBLIC_HOST}${pathname}`
            )
          }
          className="flex items-center rounded-full bg-black px-4 py-2"
        >
          <LogIn size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">로그인</span>
        </Button>
      )}
    </div>
  );
};

export default NavbarActions;
