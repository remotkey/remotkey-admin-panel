import { SetDataToLocalStorage } from "@/common/components/atoms/SetDataToLocalStorage";
import { Footer } from "@/common/components/organisms/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const interFont = inter.className;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RemotKey",
  description:
    "Individual vacation homes with hotel level support. Book ahead &amp; find the perfect vacation home. Hot tubs, pools, and views await.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont}`}>
        <SpeedInsights />
        <SetDataToLocalStorage />
        <Toaster
          position="top-center"
          reverseOrder
          toastOptions={{
            style: {
              fontWeight: "500",
              letterSpacing: "0px",
              maxWidth: "70vh",
              fontSize: "16px",
            },
            success: {
              style: {
                color: "#16922E",
              },
            },
            error: {
              style: {
                color: "#DB0F0F",
              },
            },
          }}
        />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
