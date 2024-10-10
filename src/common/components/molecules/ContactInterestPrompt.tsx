import { Button } from "../atoms/Button";

export const ContactInterestPrompt = () => {
  return (
    <div className="flex flex-col gap-2 rounded-r_125 bg-C_F7F7F7 p-[1.4375rem] text-black md:flex-row md:items-center md:justify-between md:gap-0">
      <div className="font_bold_7">
        Are you interested in buying property in this area?
        <span className="font_reg_7"> You are just a call away.</span>
      </div>
      <Button
        icon="/icons/phoneWhite.svg"
        text="970-445-2014"
        url="tel:970-445-2014"
        hasBgColor
      />
    </div>
  );
};
