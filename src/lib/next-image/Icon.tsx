import { DEFAULT_IMAGE_SRC } from "@/common/constants";
import { NextIcon } from "@/common/interfaces";
import Image from "next/image";

export const Icon = ({
  src,
  alt,
  size,
  width,
  height,
  tabIndexed,
  className,
}: NextIcon) => {
  const finalWidth = width ?? size ?? 18;
  const finalHeight = height ?? size ?? 18;

  return (
    <Image
      src={`${src || DEFAULT_IMAGE_SRC}?t=${new Date().getTime()}`}
      alt={alt || "icon"}
      width={finalWidth}
      height={finalHeight}
      priority
      unoptimized
      tabIndex={tabIndexed ? 0 : -1}
      className={className}
    />
  );
};
