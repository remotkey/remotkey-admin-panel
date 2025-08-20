"use client";

import { MainHeaderProps } from "@/common/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderButton } from "../atoms/buttons/HeaderButton";

export const MainHeader = () => {
  const pathname = usePathname();
  if (!pathname) return null;

  const defaultHeaderConfig: MainHeaderProps = {
    bgColor: "bg-C_default",
    breadCrumb: "Home",
    title: "Welcome",
    coloredTitle: "",
    menuButtonColor: "bg-C_309B5F border-C_309B5F",
  };

  const headerConfig: Record<string, MainHeaderProps> = {
    "/dashboard": {
      bgColor: "bg-C_013C3C",
      breadCrumb: "Home",
      title: "Welcome to the",
      coloredTitle: "Remôtkey Admin Panel",
      menuButtonColor: "bg-C_309B5F border-C_309B5F",
      hasMenuButtons: true,
    },
    "/add-property": {
      bgColor: "bg-C_309B5F",
      breadCrumb: (
        <>
          <Link
            href="/dashboard"
            className="text-white hover:underline hover:underline-offset-2 hover:shadow-none">
            Home
          </Link>
          {" / Add property"}
        </>
      ),
      title: "Add Property",
      coloredTitle: "",
    },
    "/edit-property": {
      bgColor: "bg-C_309B5F",
      breadCrumb: (
        <>
          <Link
            href="/dashboard"
            className="text-white hover:underline hover:underline-offset-2 hover:shadow-none">
            Home
          </Link>
          {" / Edit property"}
        </>
      ),
      title: "Edit Property",
      coloredTitle: "",
    },
    "/inquiries": {
      bgColor: "bg-C_309B5F",
      breadCrumb: (
        <>
          <Link
            href="/dashboard"
            className="text-white hover:underline hover:underline-offset-2 hover:shadow-none">
            Home
          </Link>
          {" / Inquiries"}
        </>
      ),
      title: "Inquiries",
      coloredTitle: "",
      menuButtonColor: "text-white border-white",
      hasMenuButtons: true,
    },
    "/late-checkout-requests": {
      bgColor: "bg-C_309B5F",
      breadCrumb: (
        <>
          <Link
            href="/dashboard"
            className="text-white hover:underline hover:underline-offset-2 hover:shadow-none">
            Home
          </Link>
          {" / late-checkout-requests"}
        </>
      ),
      title: "Late Checkout Requests",
      coloredTitle: "",
      menuButtonColor: "text-white border-white",
      hasMenuButtons: true,
    },
    "/vendors": {
      bgColor: "bg-C_013C3C",
      breadCrumb: (
        <>
          <Link
            href="/dashboard"
            className="text-white hover:underline hover:underline-offset-2 hover:shadow-none">
            Home
          </Link>
          {" / Vendors"}
        </>
      ),
      title: "Vendors",
    },
    "/edit-vendor": {
      bgColor: "bg-C_309B5F",
      breadCrumb: (
        <>
          <Link
            href="/dashboard"
            className="text-white hover:underline hover:underline-offset-2 hover:shadow-none">
            Home
          </Link>
          {" / Edit Vendor"}
        </>
      ),
      title: "Edit Vendor",
      coloredTitle: "",
    },
  };

  const {
    bgColor,
    breadCrumb,
    hasMenuButtons,
    menuButtonColor,
    title,
    coloredTitle,
  } = headerConfig[pathname] || defaultHeaderConfig;
  if (!pathname || !headerConfig[pathname]) return null;

  return (
    <div className={`${bgColor || "bg-C_013C3C"} mt-16 py-10 md:mt-[5.625rem]`}>
      <div className="mx-auto flex max-w-[90vw] flex-col gap-5 md:max-w-[75vw]">
        <div className="flex flex-col justify-between gap-[0.62rem] md:flex-row">
          <div className="flex flex-col gap-5">
            <div className="font_med_8 text-white hover:shadow-none">
              {breadCrumb}
            </div>
            <div className="font_bold_11 text-white">
              {title}
              {coloredTitle && (
                <span className="text-C_5EBE76"> {coloredTitle}</span>
              )}
            </div>
          </div>
          {hasMenuButtons && (
            <div className="flex gap-[0.62rem] md:flex-col">
              <HeaderButton
                url="/inquiries"
                className={menuButtonColor}
                text="Real Estate Inquiries"
              />
              <HeaderButton
                url="/late-checkout-requests"
                className={menuButtonColor}
                text="Late Checkout Requests"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
