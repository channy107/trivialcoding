import { Suspense } from "react";
import Loading from "./loading";

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
