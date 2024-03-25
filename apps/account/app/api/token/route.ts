import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get(process.env.AUTH_SESSION_NAME!);

  try {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
      cookieName: `${sessionToken?.name}`,
      salt: `${sessionToken?.name}`,
    });

    if (token) {
      return NextResponse.json({ data: token }, { status: 200 });
    } else {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }
}
