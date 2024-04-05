import { TSelectConversation } from "./../db/schema";
import { UserRole } from "@/db/schema";

export type TSender = "user" | "system";

interface TMessage {
  id: string;
  content: string;
  senderType: TSender;
}

interface TUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
  isOAuth: boolean;
}

export type { TMessage, TUser };
