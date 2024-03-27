"use server";

import db from "@/db/drizzle";
import { storeCategory } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ADMIN_STORE_ROUTES } from "@/routes";

export const getCategories = async (type?: "small" | "medium" | "large") => {
  const categories = await db.query.storeCategory.findMany({
    where: type ? eq(storeCategory.type, type) : undefined,
    orderBy: (storeCategory, { desc }) => [desc(storeCategory.createdAt)],
  });

  return categories;
};

export const getCategory = async (id?: string) => {
  if (!id) return undefined;
  const response = await db.query.storeCategory.findFirst({
    where: eq(storeCategory.id, id),
  });

  return response;
};

export const getCategoryByName = async (name: string) => {
  const response = await db.query.storeCategory.findFirst({
    where: eq(storeCategory.name, name),
  });
  return response;
};

export const createCategory = async ({
  categoryLarge,
  categoryMedium,
  categorySmall,
}: {
  categoryLarge: { name: string; type: string };
  categoryMedium: { name: string; type: string };
  categorySmall: { name: string; type: string };
}) => {
  try {
    await db
      .insert(storeCategory)
      .values({
        name: categoryLarge.name,
        type: categoryLarge.type,
      })
      .onConflictDoUpdate({
        target: [storeCategory.name, storeCategory.type],
        set: { name: categoryLarge.name, type: categoryLarge.type },
      })
      .returning();

    await db
      .insert(storeCategory)
      .values({
        name: categoryMedium.name,
        type: categoryMedium.type,
      })
      .onConflictDoUpdate({
        target: [storeCategory.name, storeCategory.type],
        set: { name: categoryMedium.name, type: categoryMedium.type },
      })
      .returning();
    await db
      .insert(storeCategory)
      .values({
        name: categorySmall.name,
        type: categorySmall.type,
      })
      .returning();
  } catch (error) {
    console.error(error);
    throw new Error("이미 존재하는 카테고리입니다.");
  }
  revalidatePath(`${ADMIN_STORE_ROUTES.CATEGORY}`);
};

export const deleteCategory = async (id: string) => {
  const result = await db.delete(storeCategory).where(eq(storeCategory.id, id));

  revalidatePath(`${ADMIN_STORE_ROUTES.CATEGORY}`);

  return result;
};
