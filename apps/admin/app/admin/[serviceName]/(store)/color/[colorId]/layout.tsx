import { Suspense } from "react";
import { FullScreenLoader } from "@repo/ui/components/service";

export default async function ColorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
}
