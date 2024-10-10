import Link from "next/link";
import { HiDownload } from "react-icons/hi";

export const Download = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      download
      className="cursor-pointer rounded-r_03125 bg-C_309B5F p-[0.62rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <HiDownload className="text-[1rem] text-white" />
    </Link>
  );
};
