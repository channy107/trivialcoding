"use server";

import db from "@/db/drizzle";
import {
  TSelectStoreProduct,
  colorsToProducts,
  sizesToProducts,
  storeProduct,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ADMIN_STORE_ROUTES } from "@/routes";

export const getProducts = async () => {
  const products = await db.query.storeProduct.findMany({
    with: {
      brand: true,
      largeCategory: true,
      mediumCategory: true,
      smallCategory: true,
      colorsToProducts: {
        with: {
          color: {
            columns: {
              name: true,
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

export const createProduct = async ({
  name,
  price,
  saleRate,
  thumbnailImages,
  productImages,
  sizes,
  smallCategoryId,
  mediumCategoryId,
  largeCategoryId,
  brandId,
  colors,
}: {
  name: string;
  price: number;
  saleRate: number;
  thumbnailImages: string[];
  productImages: string[];
  smallCategoryId: string;
  mediumCategoryId: string;
  largeCategoryId: string;
  sizes: Array<{ id: string; name: string }>;
  colors: Array<{ id: string; name: string }>;
  brandId: string;
}) => {
  const result = await db
    .insert(storeProduct)
    .values({
      name,
      price,
      isSale: saleRate !== 0,
      saleRate,
      thumbnailImages,
      productImages,
      smallCategoryId,
      mediumCategoryId,
      largeCategoryId,
      brandId,
    })
    .returning();

  colors.forEach(async (color) => {
    await db.insert(colorsToProducts).values({
      productId: result[0].id,
      colorId: color.id,
    });
  });

  sizes.forEach(async (size) => {
    await db.insert(sizesToProducts).values({
      productId: result[0].id,
      sizeId: size.id,
    });
  });

  revalidatePath(`${ADMIN_STORE_ROUTES.PRODUCT}`);

  return result;
};

export const updateProduct = async ({
  id,
  name,
  price,
  saleRate,
  thumbnailImages,
  productImages,
  sizes,
  smallCategoryId,
  mediumCategoryId,
  largeCategoryId,
  brandId,
  colors,
}: {
  id: string;
  name: string;
  price: number;
  saleRate: number;
  sizes: Array<{ id: string; name: string }>;
  thumbnailImages: string[];
  productImages: string[];
  smallCategoryId: string;
  mediumCategoryId: string;
  largeCategoryId: string;
  colors: Array<{ id: string; name: string }>;
  brandId: string;
}) => {
  const result = await db
    .update(storeProduct)
    .set({
      name,
      price,
      isSale: saleRate !== 0,
      saleRate,
      thumbnailImages,
      productImages,
      smallCategoryId,
      mediumCategoryId,
      largeCategoryId,
      brandId,
    })
    .where(eq(storeProduct.id, id));

  colors.forEach(async (color) => {
    await db
      .update(colorsToProducts)
      .set({
        colorId: color.id,
      })
      .where(eq(colorsToProducts.productId, id));
  });

  sizes.forEach(async (size) => {
    await db
      .update(sizesToProducts)
      .set({
        sizeId: size.id,
      })
      .where(eq(sizesToProducts.productId, id));
  });

  revalidatePath(`${ADMIN_STORE_ROUTES.PRODUCT}`);

  return result;
};

export const deleteProduct = async (id: string) => {
  const result = await db.delete(storeProduct).where(eq(storeProduct.id, id));

  revalidatePath(`${ADMIN_STORE_ROUTES.PRODUCT}`);

  return result;
};
