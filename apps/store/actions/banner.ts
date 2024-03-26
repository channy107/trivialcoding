"use server";

import db from "@/db/drizzle";

export const getBanners = async () => {
  const banners = await db.query.storeBanner.findMany({
    orderBy: (storeBanner, { desc }) => [desc(storeBanner.createdAt)],
  });

  return banners;
};
