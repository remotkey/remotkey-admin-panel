import { Icon } from "@/lib/next-image/Icon";
import { UspContainerInterface } from "../interfaces";

interface KeyPointsInterface {
  title: string;
  icon?: string;
  values: UspContainerInterface[];
}

export const KeyPoints = ({ title, icon, values }: KeyPointsInterface) => {
  return (
    <div className="flex flex-col gap-5">
      {title && (
        <label className="font_bold_7 leading-[150%] text-C_0E0E0E">
          {title}
        </label>
      )}
      <div className="mb-[0.88rem] flex flex-col gap-[0.94rem]">
        {values &&
          values?.map((item, index) => (
            <div className="font_reg_7 flex gap-[0.62rem]" key={index}>
              <Icon
                src={icon || "/icons/rightCheck.svg"}
                alt="checkIcon"
                size={25}
              />
              <span className="text-C_0E0E0E">{item?.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
