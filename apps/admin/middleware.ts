import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes } from "./routes";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  try {
    const sessionToken = cookies().get(process.env.AUTH_SESSION_NAME!);
    const response = await fetch(`${process.env.HOST}/api/token`, {
      headers: {
        Cookie: `${sessionToken?.name}=${sessionToken?.value}`,
      },
    });

    const token = await response.json();

    const isApiAuthRoute = pathname.includes(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(pathname);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute) {
      if (token.data) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
      }
      return NextResponse.next();
    }
    if (token.error) {
      let callbackUrl = pathname;
      if (search) {
        callbackUrl += search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.url)
      );
    }
  } catch (error) {
    console.error("error", error);
    return NextResponse.redirect(
      new URL(`https://trivialcoding.com/login`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
