import { Icon } from "@/lib/next-image/Icon";
import { LatLng } from "@/main/property/interfaces";
import Link from "next/link";

export const MapList = ({ data, icon }: { data: LatLng[]; icon?: string }) => {
  return (
    <div className="mt-[1.88rem] flex flex-col gap-[0.62rem]">
      {data?.map((item, index) => (
        <Link
          href={`https://www.google.com/maps?q=${item?.lat},${item?.lng}(${item?.place})&z=15&!3m1`}
          className="hover:shadow-none"
          key={index}
          target="_blank">
          <div className="font_reg_7 flex cursor-pointer gap-[0.62rem]">
            <Icon
              src={icon || "/icons/hospital.svg"}
              alt="checkIcon"
              size={25}
            />
            <span className="text-C_0E0E0E">{item?.place}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
