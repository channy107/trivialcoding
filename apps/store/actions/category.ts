"use server";

import db from "@/db/drizzle";
import { TSelectStoreCategory, storeCategory } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getCategories = async (
  type: string = "small",
  parentId: string | null = null
) => {
  const categories = await db.query.storeCategory.findMany({
    orderBy: (storeCategory, { desc }) => [desc(storeCategory.createdAt)],
    where: and(
      eq(storeCategory.type, type),
      parentId ? eq(storeCategory.parentCategoryId, parentId) : undefined
    ),
    with: {
      parentCategory: {
        with: {
          parentCategory: true,
        },
      },
    },
  });

  return categories as TSelectStoreCategory[];
};
