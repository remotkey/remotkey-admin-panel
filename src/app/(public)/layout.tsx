import { Navbar } from "@/common/components/molecules/NavBar";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "RemotKey - Find the perfect vacation home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative">
      <Navbar />
      <div className="mx-auto mt-[1.88rem] max-w-[75rem] py-12 md:mt-24">
        {children}
      </div>
    </div>
  );
}
