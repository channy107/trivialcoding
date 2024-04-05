"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

interface IProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const SidebarItem = ({ href, icon, label }: IProps) => {
  const pathname = usePathname();
  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
        pathname === href ? "text-white bg-white/10" : "text-zinc-400"
      )}
    >
      <div className="flex items-center flex-1 gap-2">
        {icon}
        {label}
      </div>
    </Link>
  );
};

export default SidebarItem;
