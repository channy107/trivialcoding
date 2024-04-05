"use server";

import { eq } from "drizzle-orm";
import { getCurrentUser } from "./user";
import { conversation, user } from "@/db/schema";
import db from "@/db/drizzle";

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
      messages: {
        with: {
          sender: true,
        },
      },
    },
  });

  return conversationData?.messages;
};
