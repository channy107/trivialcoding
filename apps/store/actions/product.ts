"use server";

import db from "@/db/drizzle";
import { TSelectStoreProduct } from "@/db/schema";

export const getProducts = async () => {
  const products = await db.query.storeProduct.findMany({
    with: {
      category: {
        with: {
          parentCategory: {
            with: {
              parentCategory: true,
            },
          },
        },
      },
      brand: true,
      colorsToProducts: {
        with: {
          color: true,
        },
      },
      sizesToProducts: {
        with: {
          size: true,
        },
      },
    },
    orderBy: (storeProduct, { desc }) => [desc(storeProduct.createdAt)],
  });

  return products as TSelectStoreProduct[];
};
