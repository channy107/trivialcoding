"use server";

import { eq } from "drizzle-orm";
import { getCurrentUser } from "./user";
import { conversation, user } from "@/db/schema";
import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";

export const getConversationsByUser = async () => {
  const currentUser = await getCurrentUser();
  const userInfo = await db.query.user.findFirst({
    where: eq(user.id, currentUser.id),
    with: {
      conversations: true,
    },
  });

  return userInfo?.conversations;
};

export const getMessagesByConversation = async (id: string) => {
  const conversationData = await db.query.conversation.findFirst({
    where: eq(conversation.id, id),
    with: {
      messages: true,
    },
  });

  return conversationData?.messages;
};

export const createConversation = async (name: string) => {
  const user = await getCurrentUser();
  const result = await db
    .insert(conversation)
    .values({
      name,
      ownerId: user.id,
    })
    .returning();

  revalidatePath("/");
  return result[0];
};
