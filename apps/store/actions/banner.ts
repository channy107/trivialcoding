"use server";

import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { storeBanner } from "@/db/schema";

export const getBanners = async (type?: "mobile" | "web") => {
  const banners = await db.query.storeBanner.findMany({
    where: type ? eq(storeBanner.type, type) : undefined,
    orderBy: (storeBanner, { desc }) => [desc(storeBanner.createdAt)],
  });

  return banners;
};
