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
  return (
    <Image
      src={src || DEFAULT_IMAGE_SRC}
      alt={alt}
      width={width || size}
      height={height || size}
      priority
      unoptimized
      tabIndex={tabIndexed ? 0 : -1}
      className={className}
    />
  );
};
