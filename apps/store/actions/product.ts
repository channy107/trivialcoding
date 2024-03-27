"use server";

import { eq } from "drizzle-orm";
import { TSelectStoreProduct, storeProduct } from "@/db/schema";
import db from "@/db/drizzle";

export const getProducts = async (categoryId?: string) => {
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
    where: categoryId ? eq(storeProduct.categoryId, categoryId) : undefined,
    orderBy: (storeProduct, { desc }) => [desc(storeProduct.createdAt)],
  });

  return products as TSelectStoreProduct[];
};

export const getProduct = async (id?: string) => {
  if (!id) return undefined;
  const response = await db.query.storeProduct.findFirst({
    with: {
      category: true,
      brand: true,
      colorsToProducts: {
        with: {
          color: {
            columns: {
              name: true,
              value: true,
            },
          },
        },
      },
      sizesToProducts: {
        with: {
          size: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
    where: eq(storeProduct.id, id),
  });

  return response as TSelectStoreProduct;
};
