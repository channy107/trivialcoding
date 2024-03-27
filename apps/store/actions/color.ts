"use server";

import db from "@/db/drizzle";

export const getColors = async () => {
  const colors = await db.query.storeColor.findMany({
    orderBy: (storeColor, { desc }) => [desc(storeColor.createdAt)],
  });

  return colors;
};
