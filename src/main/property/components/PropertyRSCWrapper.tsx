import { DataTable } from "@/common/components/molecules/Datatable/Datatable";
import { SearchFiltersParamsTypes } from "@/common/interfaces";
import { getProperties } from "../api/server";

export const PropertyRSCWrapper = async ({
  searchParams,
}: {
  searchParams: SearchFiltersParamsTypes;
}) => {
  const headers = [
    {
      title: "Thumbnail",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] pl-4 text-start text-C_6E6E6E",
      childClassName: "rounded-l-r_0625",
    },
    {
      title: "Property Title",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] text-start text-C_6E6E6E",
      childClassName: "max-w-48",
    },
    {
      title: "City",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] text-start text-C_6E6E6E",
    },
    {
      title: "Location",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] text-start text-C_6E6E6E",
      childClassName: "max-w-48",
    },
    {
      title: "QR Code",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] text-start text-C_6E6E6E",
    },
    {
      title: "Action",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] text-center text-C_6E6E6E",
    },
  ];

  const { data = [], meta } = await getProperties(searchParams);

  return (
    <DataTable isPropertyTable data={data} meta={meta} headers={headers} />
  );
};
