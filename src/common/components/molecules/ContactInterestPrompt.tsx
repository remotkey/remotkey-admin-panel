"use client";

import { InquiryDialog } from "@/main/inquiry/componets/InquiryFormWrapper";
import { Button } from "../atoms/Button";
import { useState } from "react";

export const ContactInterestPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 rounded-r_125 bg-C_F7F7F7 p-[1.4375rem] text-black md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="font_bold_7">
          Love it here?&nbsp;
          <span className="font_reg_7">
            Let us connect you with the best real estate agents in the Valley.
          </span>
        </div>
        <Button
          text="Submit your info here"
          hasBgColor
          onClick={() => setIsOpen(true)}
        />
      </div>
      <InquiryDialog isOpen={isOpen} handleClose={() => setIsOpen(false)} />
    </>
  );
};
