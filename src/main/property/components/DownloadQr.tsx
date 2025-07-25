import Link from "next/link";
import { HiDownload } from "react-icons/hi";

export const Download = ({ href }: { href: string }) => {
  const newUrl = href.replace(
    "https://remotkey.sfo2.digitaloceanspaces.com/properties/",
    ""
  );
  return (
    <Link
      href={`${"qr-code"}?qr=${newUrl}`}
      target="_blank"
      className="cursor-pointer rounded-r_03125 bg-C_309B5F p-[0.62rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <HiDownload className="text-[1rem] text-white" />
    </Link>
  );
};
