import { LatLng } from "@/main/property/interfaces";
import Link from "next/link";

export const AccordionTitleDescription = ({ data }: { data: LatLng }) => {
  return (
    <>
      {data?.contactNumber && (
        <div className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Contact Number</span>
          <Link
            href={`tel:${data?.contactNumber}`}
            className="font_reg_8 text-C_0E0E0E hover:shadow-none">
            {data?.contactNumber}
          </Link>
        </div>
      )}
      {data?.email && (
        <div className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Email</span>
          <Link
            href={`mailto:${data?.email}`}
            className="font_reg_8 text-C_0E0E0E hover:shadow-none">
            {data?.email}
          </Link>
        </div>
      )}
      {data?.website && (
        <div className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Website</span>
          <Link
            href={
              data?.website?.startsWith("https://")
                ? data?.website
                : `https://${data?.website}`
            }
            target="_blank"
            className="font_reg_8 cursor-pointer text-C_0E0E0E hover:shadow-none">
            {data?.website || "Not Available"}
          </Link>
        </div>
      )}
      {data?.description && (
        <div className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Description</span>
          <p className="font_reg_8 text-C_0E0E0E">{data?.description}</p>
        </div>
      )}
    </>
  );
};
