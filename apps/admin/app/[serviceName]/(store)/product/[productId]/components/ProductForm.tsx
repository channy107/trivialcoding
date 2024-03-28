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

interface Props {
  initialData?: TSelectStoreProduct;
  smallCategories: TSelectStoreCategory[];
  mediumCategories: TSelectStoreCategory[];
  largeCategories: TSelectStoreCategory[];
  brands: TSelectStoreBrand[];
  sizes: TSelectStoreSize[];
  colors: TSelectStoreColor[];
}

export const revalidate = 0;

const ProjectForm = ({
  initialData,
  smallCategories,
  mediumCategories,
  largeCategories,
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
  const [thumbnailPreviewUrls, setThumbnailPreviewUrls] = useState<string[]>(
    initialThumbnailPreviewUrls
  );
  const [productPreviewUrls, setProductPreviewUrls] = useState<string[]>(
    initialProductPreviewUrls
  );

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
      colors: [],
      sizes: [],
      smallCategoryId: initialData?.smallCategoryId || "",
      mediumCategoryId: initialData?.mediumCategoryId || "",
      largeCategoryId: initialData?.largeCategoryId || "",
      thumbnailImages: [],
      productImages: [],
    },
  });

  const { watch, setValue, clearErrors, setError } = form;
  const [thumbnailImages, productImages] = watch([
    "thumbnailImages",
    "productImages",
  ]);

  const onDrop = async (
    acceptedFiles: File[],
    key: "thumbnailImages" | "productImages"
  ) => {
    if (key === "thumbnailImages") {
      setValue("thumbnailImages", acceptedFiles);
      setThumbnailPreviewUrls(() =>
        acceptedFiles.map((file) => URL.createObjectURL(file))
      );
      clearErrors("thumbnailImages");
    } else {
      setValue("productImages", acceptedFiles);
      setProductPreviewUrls(() =>
        acceptedFiles.map((file) => URL.createObjectURL(file))
      );
      clearErrors("productImages");
    }
  };

  const onDelete = (
    index: number,
    key: "thumbnailImages" | "productImages"
  ) => {
    if (key === "thumbnailImages") {
      const newPreviewUrls = thumbnailPreviewUrls.filter(
        (_, idx) => idx !== index
      );
      const newImages = thumbnailImages.filter((_, idx) => idx !== index);

      if (newImages.length === 0) {
        setError("thumbnailImages", {
          type: "required",
          message: "상품 이미지를 업로드해주세요.",
        });
      }

      setValue("thumbnailImages", newImages);
      setThumbnailPreviewUrls(newPreviewUrls);
    } else {
      const newPreviewUrls = productPreviewUrls.filter(
        (_, idx) => idx !== index
      );
      const newImages = productImages.filter((_, idx) => idx !== index);

      if (newImages.length === 0) {
        setError("productImages", {
          type: "required",
          message: "상품 이미지를 업로드해주세요.",
        });
      }

      setValue("productImages", newImages);
      setProductPreviewUrls(newPreviewUrls);
    }
  };

  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    const formData = new FormData();

    const thumbnailImageUrls = data.thumbnailImages.map(
      (image) =>
        `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/product/${data.name}/thumbnail/${image.name}`
    );

    const productImageUrls = data.productImages.map(
      (image) =>
        `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/product/${data.name}/product/${image.name}`
    );

    data.thumbnailImages.forEach((file) => {
      formData.append("name", `product/${data.name}/thumbnail`);
      formData.append("file", file, file.name);
    });

    data.productImages.forEach((file) => {
      formData.append("name", `product/${data.name}/product`);
      formData.append("file", file, file.name);
    });

    try {
      setLoading(true);
      await uploadImage(formData);

      if (initialData) {
        updateProduct({
          id: initialData.id,
          name: data.name,
          price: data.price,
          saleRate: data.saleRate || 0,
          brandId: data.brandId,
          smallCategoryId: data.smallCategoryId,
          mediumCategoryId: data.mediumCategoryId,
          largeCategoryId: data.largeCategoryId,
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
          smallCategoryId: data.smallCategoryId,
          mediumCategoryId: data.mediumCategoryId,
          largeCategoryId: data.largeCategoryId,
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
              name="largeCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리(대분류)</FormLabel>
                  <Select
                    disabled={loading}
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="카테고리를 선택해주세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {largeCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mediumCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리(중분류)</FormLabel>
                  <Select
                    disabled={loading}
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="카테고리를 선택해주세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mediumCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smallCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리(소분류)</FormLabel>
                  <Select
                    disabled={loading}
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="카테고리를 선택해주세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {smallCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
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
                      onDrop={(acceptedFiles) =>
                        onDrop(acceptedFiles, "thumbnailImages")
                      }
                      onDelete={(index) => onDelete(index, "thumbnailImages")}
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
                      onDrop={(acceptedFiles) =>
                        onDrop(acceptedFiles, "productImages")
                      }
                      onDelete={(index) => onDelete(index, "productImages")}
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
