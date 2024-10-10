import { Pagination } from "@/common/components/atoms/Pagination";
import { getProperties } from "../api/server";
import { PropertyCard } from "./PropertyCard";
import { SearchFiltersParamsTypes } from "@/common/interfaces";

export const PropertyTable = async ({
  params,
}: {
  params: SearchFiltersParamsTypes;
}) => {
  const { data = [], meta } = await getProperties(params);

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
      childClassName: "max-w-60",
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
      childClassName: "max-w-60",
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

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-[0.69rem]">
          <thead>
            <tr>
              <th className="font_med_8 border-y border-C_DEDEDE py-[0.94rem] pl-4 text-start text-C_6E6E6E">
                <div className="flex items-center whitespace-nowrap">Sr No</div>
              </th>
              {headers.map((el, index) => (
                <th key={index} className={`${el?.parentClassName} px-4`}>
                  {el?.title === "Property Title" ||
                  el?.title === "Location" ? (
                    <div className={el?.childClassName}>{el?.title}</div>
                  ) : (
                    el?.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length ? (
              <PropertyCard data={data} />
            ) : (
              <tr className="bg-C_F7F7F7">
                <td
                  className="pl-4 text-center first:rounded-r_0625"
                  colSpan={10}>
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination totalItem={meta?.pagination?.total || 5} />
    </>
  );
};
