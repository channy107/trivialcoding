"use server";

import db from "@/db/drizzle";
import { TSelectStoreCategory, storeCategory } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getCategories = async (
  type: string = "small",
  parentCategoryId?: string
) => {
  const categories = await db.query.storeCategory.findMany({
    orderBy: (storeCategory, { desc }) => [desc(storeCategory.createdAt)],
    where: and(
      eq(storeCategory.type, type),
      parentCategoryId
        ? eq(storeCategory.parentCategoryId, parentCategoryId)
        : undefined
    ),
  });

  return categories as TSelectStoreCategory[];
};

export const getCategory = async (id?: string) => {
  if (!id) return undefined;
  const response = await db.query.storeCategory.findFirst({
    where: eq(storeCategory.id, id),
  });

  return response as TSelectStoreCategory;
};
