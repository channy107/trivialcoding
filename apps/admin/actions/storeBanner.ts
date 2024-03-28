"use server";

import db from "@/db/drizzle";
import { storeBanner } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ADMIN_STORE_ROUTES } from "@/routes";

export const getBanners = async (type?: string) => {
  const banners = await db.query.storeBanner.findMany({
    where: type ? eq(storeBanner.type, type) : undefined,
    orderBy: (storeBanner, { desc }) => [desc(storeBanner.createdAt)],
  });

  return banners;
};

export const getBanner = async (id?: string, type?: string) => {
  if (!id) return undefined;
  const response = await db.query.storeBanner.findFirst({
    where: and(
      eq(storeBanner.id, id),
      type ? eq(storeBanner.type, type) : undefined
    ),
  });

  return response;
};

export const createBanner = async ({
  type,
  images,
}: {
  type: string;
  images: string[];
}) => {
  const result = await db
    .insert(storeBanner)
    .values({
      type,
      images,
    })
    .returning();

  revalidatePath(`${ADMIN_STORE_ROUTES.BANNER}`);

  return result;
};

export const updateBanner = async ({
  id,
  type,
  images,
}: {
  id: string;
  type: string;
  images: string[];
}) => {
  const result = await db
    .update(storeBanner)
    .set({
      type,
      images,
    })
    .where(eq(storeBanner.id, id));
  revalidatePath(`${ADMIN_STORE_ROUTES.BANNER}`);
  return result;
};

export const deleteBanner = async (id: string) => {
  const result = await db.delete(storeBanner).where(eq(storeBanner.id, id));
  revalidatePath(`${ADMIN_STORE_ROUTES.BANNER}`);
  return result;
};
