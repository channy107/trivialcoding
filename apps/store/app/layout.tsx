import type { Metadata } from "next";

import { Inter } from "next/font/google";
import ModalProvider from "@providers/ModalProvider";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
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
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
