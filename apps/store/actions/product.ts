"use server";

import { and, eq } from "drizzle-orm";
import { TSelectStoreProduct, storeProduct } from "@/db/schema";
import db from "@/db/drizzle";

interface IProductsParams {
  largeCategoryId?: string;
  mediumCategoryId?: string;
  smallCategoryId?: string;
  colorIds?: string[];
  sizeIds?: string[];
  isSale?: boolean;
}

export const getProducts = async ({
  largeCategoryId,
  mediumCategoryId,
  smallCategoryId,
  isSale,
}: IProductsParams) => {
  const products = await db.query.storeProduct.findMany({
    with: {
      brand: true,
      largeCategory: true,
      mediumCategory: true,
      smallCategory: true,
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

    where: and(
      largeCategoryId
        ? eq(storeProduct.largeCategoryId, largeCategoryId)
        : undefined,
      mediumCategoryId
        ? eq(storeProduct.mediumCategoryId, mediumCategoryId)
        : undefined,
      smallCategoryId
        ? eq(storeProduct.smallCategoryId, smallCategoryId)
        : undefined,
      isSale ? eq(storeProduct.isSale, isSale) : undefined
    ),
    orderBy: (storeProduct, { desc }) => [desc(storeProduct.createdAt)],
  });

  return products as TSelectStoreProduct[];
};

export const getProduct = async (id?: string) => {
  if (!id) return undefined;
  const response = await db.query.storeProduct.findFirst({
    with: {
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
