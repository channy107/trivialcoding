"use server";

import db from "@/db/drizzle";

import { message } from "@/db/schema";
import { CHAT_ROUTES } from "@/routes";
import { revalidatePath } from "next/cache";

export const addMessage = async (
  conversationId: string,
  senderType: string,
  content: string
) => {
  const response = await db.insert(message).values({
    content,
    senderType,
    conversationId,
  });

  revalidatePath(CHAT_ROUTES.CONVERSATION);

  return response;
};
