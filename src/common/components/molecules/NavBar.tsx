import { MAIN_WEBSITE_URL, WEBSITE_URL } from "@/common/constants";
import { Icon } from "@/lib/next-image/Icon";
import Link from "next/link";
import { Button, MainWebsiteButton } from "../atoms/Button";

export const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow-[0px_4px_17px_0px_rgba(0,0,0,0.05)] md:px-12 md:py-6">
      <Link href={WEBSITE_URL} className="hover:!shadow-none">
        <Icon src="/icons/logo.svg" alt="Logo" width={160} height={36} />
      </Link>
      <div className="flex items-center gap-5">
        <Button
          icon="/icons/phone.svg"
          text="970-445-2014"
          url="tel:970-445-2014"
        />
        <MainWebsiteButton
          text="Go to main Website"
          icon="/icons/calender.svg"
          url={MAIN_WEBSITE_URL}
        />
      </div>
    </nav>
  );
};
