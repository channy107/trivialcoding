import { CredentialsSignin } from "next-auth";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { LoginSchema } from "@/schemas";

import { getUserByEmail } from "@/data/user";

const useSecureCookies = process.env.HOST!.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.HOST!).hostname;

export default {
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const credentialsSignin = new CredentialsSignin();
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user) {
            credentialsSignin.code = "noUser";
            throw credentialsSignin;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password as string
          );

          if (!passwordsMatch) {
            credentialsSignin.code = "wrongPassword";
            throw credentialsSignin;
          }

          return user;
        }

        return null;
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName == "localhost" ? hostName : "." + hostName,
      },
    },
  },
} satisfies NextAuthConfig;
