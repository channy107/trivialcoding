"use client";

import Link from "next/link";
import Image from "next/image";

import { MessageSquare, Plus } from "lucide-react";

import LogoutButton from "./LogoutButton";
import SidebarItem from "./SidebarItem";
import { TSelectConversation } from "@/db/schema";

interface IProps {
  conversations?: TSelectConversation[];
}

const Sidebar = ({ conversations }: IProps) => {
  const formattedItems = conversations?.map((conversation) => ({
    label: conversation.name || "",
    icon: <MessageSquare />,
    href: `/conversations/${conversation.id}`,
  }));

  return (
    <div className="py-2 flex flex-col h-full bg-black text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image width={40} height={40} alt="Logo" src="/logo.png" />
          </div>
          <h1 className={"text-2xl font-bold"}>Chat GPT</h1>
        </Link>
        <div className="space-y-1">
          <SidebarItem href="/" icon={<Plus />} label="새로운 대화" />
          {formattedItems?.map((item) => (
            <SidebarItem
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <LogoutButton className="w-[80%]" />
      </div>
    </div>
  );
};

export default Sidebar;
