"use client";
import { CardCheckBoxProps } from "@/common/interfaces";
import { LuCheck } from "react-icons/lu";

export const CardCheckBox = ({ checked, onChange }: CardCheckBoxProps) => {
  return (
    <div className="cursor-pointer" onClick={onChange}>
      <div
        className={`group block size-4 rounded-sm border border-C_D0D0D0 ${
          checked ? "bg-C_5EBE76 text-white" : "bg-white text-C_D0D0D0"
        }`}>
        {checked && <LuCheck size={14} />}
      </div>
    </div>
  );
};
