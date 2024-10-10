import { DEFAULT_IMAGE_SRC, IMAGE_BLUR_DATA_URL } from "@/common/constants";
import { NextFillImageProps } from "@/common/interfaces";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const NextFillImage = ({
  children,
  src,
  alt,
  parentClassName,
  childrenClassName,
  priority,
  // pass placeholder attribute in case of opting out of blur image effect
  noBlurEffect,
  quality,
  onClick,
}: NextFillImageProps) => {
  return (
    <div className={`relative overflow-hidden ${parentClassName}`}>
      <Image
        src={src || DEFAULT_IMAGE_SRC}
        alt={alt}
        fill
        priority={priority || false}
        quality={quality || 50}
        placeholder={noBlurEffect ? "empty" : IMAGE_BLUR_DATA_URL}
        onClick={onClick}
        className={twMerge("object-cover", childrenClassName)}
      />
      {/* children is only used when this component used as background image */}
      {children}
    </div>
  );
};
