import { NextFillImage } from "@/lib/next-image/NextFillImage";

export const PropertyImage = ({ thumbnail }: { thumbnail: string }) => {
  return (
    <div className="relative mb-10 mt-[1.12rem] h-[26.125rem] w-full">
      <NextFillImage
        src={thumbnail || ""}
        priority
        parentClassName="size-full rounded-r_0625 object-cover"
        alt="propertyThumbnail"
      />
    </div>
  );
};
