"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@repo/ui/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import ConfirmButton from "@components/auth/ConfirmButton";
import { CardWrapper } from "@components/auth/CardWrapper";
import { FormError } from "@components/auth/FormError";
import { FormSuccess } from "@components/auth/FormSuccess";
import { newPassword } from "@actions/newPassword";
import { NewPasswordSchema } from "@/schemas";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const password = watch("password");

  const isValidateError = Object.keys(errors).length !== 0;
  const isEmptyField = password === "";

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setSuccess(data?.success);
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  };

  const isSubmitButtonDisabled = isPending || isValidateError || isEmptyField;

  return (
    <CardWrapper
      headerTitle="새 비밀번호 설정"
      backButtonLabel="로그인으로 돌아가기"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <ConfirmButton
            disabled={isSubmitButtonDisabled}
            isPending={isPending}
            buttonText={"재설정 완료"}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
