import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import ModalProvider from "@providers/ModalProvider";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { FullScreenLoader } from "@repo/ui/components/service";
import "@repo/ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<FullScreenLoader />}>
          <ModalProvider />
          <Navbar />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
