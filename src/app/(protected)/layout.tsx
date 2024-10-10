import { Navbar } from "@/common/components/molecules/NavBar";
import { ProgressBar } from "@/common/components/molecules/Shimmer/ProgressBar";
import { MainHeader } from "@/common/components/organisms/MainHeader";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative">
      <ProgressBar />
      <Navbar />
      <MainHeader />
      <div className="mx-auto my-16 max-w-[90vw] md:max-w-[75vw]">
        {children}
      </div>
    </div>
  );
}
