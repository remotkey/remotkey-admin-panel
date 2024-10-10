import { FOOTER_CONTACT_DATA } from "@/common/constants";
import Image from "next/image";
import { ContactUsListIcon } from "../atoms/ContactUsListIcon";
import { Divider } from "../atoms/Devider";
import { LogOutButton } from "../atoms/LogOutButton";

export const Footer = () => {
  return (
    <div className="flex flex-col gap-5 bg-C_002E2E px-10 py-12">
      <Image src="/icons/logoWhite.svg" alt="" width={131.495} height={30} />
      <Divider />
      <div className="flex flex-col justify-between gap-5 md:flex-row md:gap-0">
        <div className="flex flex-col gap-[0.9375rem]">
          <div className="font_bold_6 text-C_5EBE76">Contact us</div>
          <div className="flex flex-col gap-5 lg:flex-row">
            {FOOTER_CONTACT_DATA?.map((data) => (
              <ContactUsListIcon key={data?.text} data={data} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[0.9375rem]">
          {/* <div className="font_bold_6 text-C_5EBE76">Logout</div> */}
          <div className="flex gap-[0.9375rem]">
            <LogOutButton />
          </div>
        </div>
      </div>
      <div className="font_reg_8 text-white">
        &copy; Remotkey {new Date().getFullYear()}. All rights reserved.
      </div>
    </div>
  );
};
