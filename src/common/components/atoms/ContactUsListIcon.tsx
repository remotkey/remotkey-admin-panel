import { FooterContactUsIconType } from "@/common/interfaces";
import Image from "next/image";
import Link from "next/link";

export const ContactUsListIcon = ({
  data,
}: {
  data: FooterContactUsIconType;
}) => {
  return (
    <div className="flex cursor-pointer items-center gap-2.5">
      <Image src={data.icon} alt={data.alt} width={20} height={20} />
      <Link
        href={data?.href || "#"}
        {...(data.isNewTab && { target: "_blank" })}
        className="text-white hover:shadow-none">
        {data.text}
      </Link>
    </div>
  );
};
