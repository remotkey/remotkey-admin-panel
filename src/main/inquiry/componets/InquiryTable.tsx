import { Pagination } from "@/common/components/atoms/Pagination";
import { SearchFiltersParamsTypes } from "@/common/interfaces";
import { InquiryCard } from "./InquiryCard";
import { getInquiries } from "../api/actions";

export const InquiryTable = async ({
  params,
}: {
  params: SearchFiltersParamsTypes;
}) => {
  const { data = [], meta } = await getInquiries({ params });

  const headers = [
    {
      title: "Full Name",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] pl-4 text-start text-C_6E6E6E",
      childClassName: "rounded-l-r_0625",
    },
    {
      title: "Phone",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] text-start text-C_6E6E6E",
    },
    {
      title: "Email",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] text-start text-C_6E6E6E",
      childClassName: "max-w-60",
    },
    {
      title: "Interested Area",
      parentClassName:
        "font_med_8 border-y border-C_DEDEDE py-[0.94rem] text-start text-C_6E6E6E",
      childClassName: "max-w-60",
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
                  {el?.title === "Full Name" || el?.title === "Email" ? (
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
              <InquiryCard data={data} />
            ) : (
              <tr className="bg-C_F7F7F7">
                <td
                  className="pl-4 text-center first:rounded-r_0625"
                  colSpan={10}>
                  No Inquiries found
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
