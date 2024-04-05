"use server";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const token = cookies().get(process.env.AUTH_SESSION_NAME!);
  const response = await fetch(`${process.env.AUTH_URL}/session`, {
    headers: {
      Cookie: `${token?.name}=${token?.value}`,
    },
  });

  const session = await response.json();

  if (session) {
    return session.user;
  } else {
    return null;
  }
};
