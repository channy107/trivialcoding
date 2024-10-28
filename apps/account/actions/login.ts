"use server";

import * as z from "zod";
import { CredentialsSignin } from "next-auth";

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("잘못된 입력 값이 존재합니다.");
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    throw new Error("존재하지 않는 이메일입니다.");
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success:
        "회원가입이 완료되지 않았습니다. \n가입 확인 메일을 확인해주세요.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      switch (error.code) {
        case "noUser":
          throw new Error("존재하지 않는 유저 입니다.");
        case "wrongPassword":
          throw new Error("비밀번호를 잘못 입력했습니다.");
        default:
          throw new Error("문제가 발생했습니다.");
      }
    }
  }
};
