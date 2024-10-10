"use client";

import { MainHeaderProps } from "@/common/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainHeader = () => {
  const pathname = usePathname();
  if (!pathname) return null;

  const headerConfig: Record<string, MainHeaderProps> = {
    "/dashboard": {
      bgColor: "bg-C_013C3C",
      breadCrumb: "Home",
      title: "Welcome to the",
      coloredTitle: "Remôtkey Admin Panel",
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
  };

  const { bgColor, breadCrumb, title, coloredTitle } = headerConfig[pathname];
  if (!pathname || !headerConfig[pathname]) return null;

  return (
    <div className={`${bgColor || "bg-C_013C3C"} mt-16 py-10 md:mt-[5.625rem]`}>
      <div className="mx-auto flex max-w-[90vw] flex-col gap-5 md:max-w-[75vw]">
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
    </div>
  );
};
