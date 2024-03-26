import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes } from "./routes";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname, search } = req.nextUrl;

  const isApiAuthRoute = pathname.includes(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (session) {
      const param = new URLSearchParams(search);
      const callbackUrl = param.get("callbackUrl");

      return NextResponse.redirect(
        new URL(callbackUrl || DEFAULT_LOGIN_REDIRECT, req.url)
      );
    }
    return NextResponse.next();
  }
  if (!session) {
    let callbackUrl = pathname;
    if (search) {
      callbackUrl += search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
