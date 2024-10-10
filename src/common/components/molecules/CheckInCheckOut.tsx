import { Icon } from "@/lib/next-image/Icon";
import Image from "next/image";

export const CheckInCheckOut = ({
  checkIn,
  checkOut,
}: {
  checkIn: string;
  checkOut: string;
}) => {
  return (
    <div className="flex gap-[4.38rem]">
      <div className="flex gap-5">
        <Icon src="/icons/calenderGreen.svg" alt="calenderIcon" size={30} />
        <div className="flex flex-col text-C_0E0E0E">
          <div className="font_bold_7">Check-in time</div>
          <div className="font_reg_8">{checkIn}</div>
        </div>
      </div>
      <div className="flex gap-5">
        <Image
          src="/icons/checkOut.svg"
          alt="checkoutIcon"
          width={32}
          height={30}
        />
        <div className="flex flex-col text-C_0E0E0E">
          <div className="font_bold_7">Check-out time</div>
          <div className="font_reg_8">{checkOut}</div>
        </div>
      </div>
    </div>
  );
};
