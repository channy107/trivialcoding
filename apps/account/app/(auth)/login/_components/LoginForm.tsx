"use client";

import * as z from "zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

import { login } from "@actions/login";

import { Button } from "@repo/ui/components/ui/button";
import { CardWrapper } from "@components/auth/CardWrapper";
import { FormSuccess } from "@components/auth/FormSuccess";
import { FormError } from "@components/auth/FormError";
import ConfirmButton from "@components/auth/ConfirmButton";
import { LoginSchema } from "@/schemas";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const [email, password] = watch(["email", "password"]);

  const isValidateError = Object.keys(errors).length !== 0;
  const isEmptyField = email === "" || password === "";

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      login(values, callbackUrl)
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
      headerTitle="로그인"
      backButtonLabel="아직 계정이 없으신가요?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal text-sky-700 mt-10"
                  >
                    <Link href="/reset">비밀번호를 잊으셨나요?</Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <ConfirmButton
            disabled={isSubmitButtonDisabled}
            isPending={isPending}
            buttonText={"로그인하기"}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
