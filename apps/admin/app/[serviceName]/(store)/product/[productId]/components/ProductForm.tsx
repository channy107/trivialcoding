"use client";

import * as z from "zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@components/Heading";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

import {
  TSelectStoreBrand,
  TSelectStoreCategory,
  TSelectStoreColor,
  TSelectStoreProduct,
  TSelectStoreSize,
} from "@/db/schema";
import { uploadImage } from "@/actions/imageUpload";
import { createProduct, updateProduct } from "@/actions/storeProduct";
import ImageUpload from "@components/ImageUpload";
import { ADMIN_STORE_ROUTES } from "@/routes";
import MultiSelect from "@components/MultiSelect";
import { productFormSchema } from "@/schemas";
import useImageUploadForm from "@/hooks/useImageUploadForm";
import { getProductImageFormData } from "@/utils/imageForm";

export interface ICategory extends TSelectStoreCategory {
  fullCategory: string;
}

interface Props {
  initialData?: TSelectStoreProduct;
  categories: ICategory[];
  brands: TSelectStoreBrand[];
  sizes: TSelectStoreSize[];
  colors: TSelectStoreColor[];
}

export const revalidate = 0;

const ProjectForm = ({
  initialData,
  categories,
  sizes,
  brands,
  colors,
}: Props) => {
  const initialThumbnailPreviewUrls = initialData
    ? initialData.thumbnailImages
    : [];
  const initialProductPreviewUrls = initialData
    ? initialData.productImages
    : [];

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "상품 수정하기" : "상품 만들기";
  const toastMessage = initialData
    ? "상품 수정을 완료했습니다."
    : "새로운 상품을 만들었습니다.";
  const action = initialData ? "수정 완료" : "만들기";

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      saleRate: initialData?.saleRate || 0,
      brandId: initialData?.brandId || "",
      category: {},
      colors: [],
      sizes: [],
      thumbnailImages: [],
      productImages: [],
    },
  });

  const {
    previewUrls: thumbnailPreviewUrls,
    onDrop: onDropThumbnail,
    onDelete: onDeleteThumbnail,
  } = useImageUploadForm({
    initialPreviewUrls: initialThumbnailPreviewUrls,
    key: "thumbnailImages",
    form,
  });

  const {
    previewUrls: productPreviewUrls,
    onDrop: onDropProduct,
    onDelete: onDeleteProduct,
  } = useImageUploadForm({
    initialPreviewUrls: initialProductPreviewUrls,
    key: "productImages",
    form,
  });

  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    const formData = getProductImageFormData({
      thumbnail: data.thumbnailImages,
      product: data.productImages,
    });

    const thumbnailImageUrls = data.thumbnailImages.map(
      (image) =>
        `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/product/${data.name}/thumbnail/${image.name}`
    );

    const productImageUrls = data.productImages.map(
      (image) =>
        `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/product/${data.name}/product/${image.name}`
    );

    try {
      setLoading(true);
      await uploadImage(formData, `product/${data.name}`);

      if (initialData) {
        updateProduct({
          id: initialData.id,
          name: data.name,
          price: data.price,
          saleRate: data.saleRate || 0,
          brandId: data.brandId,
          smallCategoryId: data.category.id,
          mediumCategoryId: data.category.parentCategory.id,
          largeCategoryId: data.category.parentCategory.parentCategory.id,
          sizes: data.sizes,
          colors: data.colors,
          thumbnailImages: thumbnailImageUrls,
          productImages: productImageUrls,
        });
      } else {
        createProduct({
          name: data.name,
          price: data.price,
          saleRate: data.saleRate || 0,
          brandId: data.brandId,
          smallCategoryId: data.category.id,
          mediumCategoryId: data.category.parentCategory.id,
          largeCategoryId: data.category.parentCategory.parentCategory.id,
          sizes: data.sizes,
          colors: data.colors,
          thumbnailImages: thumbnailImageUrls,
          productImages: productImageUrls,
        });
      }

      router.refresh();
      router.push(`${ADMIN_STORE_ROUTES.PRODUCT}`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("문제가 발생 하였습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <FormProvider {...form}>
      <div className="flex items-center justify-center">
        <Heading title={title} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-8 w-full"
        >
          <div className="flex flex-col gap-5 w-[500px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="상품 이름을 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 설명</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="상품 설명을 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>가격</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="10,000원"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <Select
                    disabled={loading}
                    value={field.value.fullCategory}
                    onValueChange={(fullCategory) => {
                      const selectedCategory = categories.find(
                        (category) => category.fullCategory === fullCategory
                      );
                      if (selectedCategory) {
                        field.onChange(selectedCategory);
                      }
                    }}
                    defaultValue={field.value.fullCategory}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value.fullCategory}
                          placeholder="카테고리를 선택해주세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.fullCategory}
                        >
                          {category.fullCategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>브랜드</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="브랜드를 선택해주세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={() => (
                <FormItem>
                  <FormLabel>상품 사이즈</FormLabel>
                  <FormControl>
                    <MultiSelect items={sizes} name={"sizes"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={() => (
                <FormItem>
                  <FormLabel>색상</FormLabel>
                  <FormControl>
                    <MultiSelect items={colors} name={"colors"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saleRate"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>할인율</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="ex) 10%"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnailImages"
              render={() => (
                <FormItem className="my-3">
                  <FormLabel>썸네일 이미지</FormLabel>
                  <FormControl>
                    <ImageUpload
                      previewUrls={thumbnailPreviewUrls}
                      onDrop={(acceptedFiles) => onDropThumbnail(acceptedFiles)}
                      onDelete={(index) => onDeleteThumbnail(index)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productImages"
              render={() => (
                <FormItem className="my-3">
                  <FormLabel>상품 이미지</FormLabel>
                  <FormControl>
                    <ImageUpload
                      previewUrls={productPreviewUrls}
                      onDrop={(acceptedFiles) => onDropProduct(acceptedFiles)}
                      onDelete={(index) => onDeleteProduct(index)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              variant={"secondary"}
              className="ml-auto mr-2"
              onClick={onCancel}
              type="button"
            >
              취소
            </Button>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
    </FormProvider>
  );
};

export default ProjectForm;
