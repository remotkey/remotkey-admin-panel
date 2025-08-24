import { Pagination } from "@/common/components/atoms/Pagination";
import { SearchFiltersParamsTypes } from "@/common/interfaces";
import { getVendors } from "../api/actions";
import { VendorCard } from "./VendorCard";
import {
  VENDOR_TABLE_HEADERS,
  VENDOR_STATUS_MESSAGES,
  VENDOR_TABLE_STYLES,
} from "../constants";

export const VendorsTable = async ({
  params,
}: {
  params: SearchFiltersParamsTypes;
}) => {
  const { data = [], meta } = await getVendors({ params });

  const headers = [
    {
      title: VENDOR_TABLE_HEADERS.NAME,
      parentClassName: VENDOR_TABLE_STYLES.HEADER_BASE,
      childClassName: "rounded-l-r_0625",
    },
    {
      title: VENDOR_TABLE_HEADERS.LINKED_WITH,
      parentClassName: VENDOR_TABLE_STYLES.HEADER_BASE,
    },
    {
      title: VENDOR_TABLE_HEADERS.CONTACT_INFO,
      parentClassName: VENDOR_TABLE_STYLES.HEADER_BASE,
    },
    {
      title: VENDOR_TABLE_HEADERS.DESCRIPTION,
      parentClassName: VENDOR_TABLE_STYLES.HEADER_BASE,
      childClassName: "max-w-60",
    },
    {
      title: VENDOR_TABLE_HEADERS.ACTIONS,
      parentClassName: VENDOR_TABLE_STYLES.HEADER_BASE,
    },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-[0.69rem]">
          <thead>
            <tr className="whitespace-nowrap">
              <th className={`${VENDOR_TABLE_STYLES.HEADER_BASE} pl-4`}>
                <div className="flex items-center whitespace-nowrap">
                  {VENDOR_TABLE_HEADERS.SR_NO}
                </div>
              </th>
              {headers?.map((el, index) => (
                <th key={index} className={`${el?.parentClassName} px-4`}>
                  {el?.title === VENDOR_TABLE_HEADERS.NAME ? (
                    <div className={el?.childClassName}>{el?.title}</div>
                  ) : (
                    el?.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              <VendorCard data={data} />
            ) : (
              <tr className={VENDOR_TABLE_STYLES.ROW_BASE}>
                <td className={VENDOR_TABLE_STYLES.NO_DATA_CELL} colSpan={10}>
                  {VENDOR_STATUS_MESSAGES.NO_VENDORS_FOUND}
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
