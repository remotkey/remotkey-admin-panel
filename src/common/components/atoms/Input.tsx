"use client";
import { useState } from "react";
import Image from "next/image";
import { InputTypes } from "@/common/interfaces";

export const Input = ({
  icon,
  alt,
  type = "text",
  placeholder,
  name,
  label,
  onChange,
}: InputTypes) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-[0.62rem]">
      <label className="font_med_8 relative w-fit">
        {label}
        <span className="ml-1 text-sm font-medium text-red-500">*</span>
      </label>
      <div
        className={`flex items-center gap-2.5 rounded-r_08125 border px-4 py-[0.88rem] ${
          isFocused ? "border-C_5EBE76" : "border-C_DEDEDE"
        }`}>
        {icon && (
          <div className="relative size-6">
            <Image src={icon} alt={alt || ""} width={24} height={24} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder || "Type here..."}
          className="font_med_8 h-full flex-1"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          name={name}
        />
      </div>
    </div>
  );
};
