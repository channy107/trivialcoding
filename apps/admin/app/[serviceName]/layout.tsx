import { Suspense } from "react";
import { FullScreenLoader } from "@repo/ui/components/service";
import Navbar from "@components/Navbar";

export default async function ServiceLayout({
  children,
  params: { serviceName },
}: {
  children: React.ReactNode;
  params: { serviceName: string };
}) {
  return (
    <>
      <Suspense fallback={<FullScreenLoader />}>
        <Navbar serviceName={serviceName} />
        {children}
      </Suspense>
    </>
  );
}
