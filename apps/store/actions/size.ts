"use server";

import db from "@/db/drizzle";

export const getSizes = async () => {
  const sizes = await db.query.storeSize.findMany({
    orderBy: (storeSize, { desc }) => [desc(storeSize.createdAt)],
  });

  return sizes;
};
