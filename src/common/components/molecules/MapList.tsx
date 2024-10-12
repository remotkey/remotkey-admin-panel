import { LatLng } from "@/main/property/interfaces";
import { MapListAccordionList } from "./MapListAccordionList";

export const MapList = ({ data, icon }: { data: LatLng[]; icon?: string }) => {
  return (
    <div className="mt-[1.88rem] flex flex-col gap-[0.62rem]">
      {data?.map((item, index) => (
        <MapListAccordionList key={index} data={item} icon={icon} />
      ))}
    </div>
  );
};
