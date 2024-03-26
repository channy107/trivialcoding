"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

import { TSelectStoreBrand } from "@/db/schema";
import { createBrand, updateBrand } from "@/actions/storeBrand";
import { ADMIN_STORE_ROUTES } from "@/routes";
import { brandFormSchema } from "@/schemas";

interface Props {
  initialData?: TSelectStoreBrand;
}

const BrandForm = ({ initialData }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "브랜드 수정하기" : "브랜드 만들기";
  const toastMessage = initialData
    ? "브랜드 수정을 완료했습니다."
    : "새로운 브랜드를 만들었습니다.";
  const action = initialData ? "수정 완료" : "만들기";

  const form = useForm<z.infer<typeof brandFormSchema>>({
    resolver: zodResolver(brandFormSchema),
    mode: "onChange",
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof brandFormSchema>) => {
    try {
      if (initialData) {
        setLoading(true);
        updateBrand({ id: initialData.id, name: data.name });
      } else {
        createBrand({
          name: data.name,
        });
      }

      router.refresh();
      router.push(`${ADMIN_STORE_ROUTES.BRAND}`);
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
    <>
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
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="이름을 입력해주세요."
                      {...field}
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
    </>
  );
};

export default BrandForm;
