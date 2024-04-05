import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { UserRole } from "./db/schema";
import { apiAuthPrefix } from "./routes";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  try {
    const token = cookies().get(process.env.AUTH_SESSION_NAME!);
    const response = await fetch(`${process.env.AUTH_URL}/session`, {
      headers: {
        Cookie: `${token?.name}=${token?.value}`,
      },
    });

    const session = await response.json();
    const isApiAuthRoute = pathname.includes(apiAuthPrefix);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    if (!session) {
      let callbackUrl = pathname;
      if (search) {
        callbackUrl += search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_ACCOUNT_URL}/login?callbackUrl=${process.env.NEXT_PUBLIC_HOST}/${encodedCallbackUrl}`,
          req.url
        )
      );
    }
  } catch (error) {
    console.error("error", error);
    return NextResponse.redirect(
      new URL(
        `${process.env.NEXT_PUBLIC_ACCOUNT_URL}/login?callbackUrl=${process.env.NEXT_PUBLIC_HOST}`,
        req.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
