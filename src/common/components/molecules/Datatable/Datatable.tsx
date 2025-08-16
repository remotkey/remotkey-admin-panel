import { Pagination } from "@/common/components/atoms/Pagination";
import { PropertyCard } from "@/main/property/components/PropertyCard";
import { PropertyCardProps } from "@/main/property/interfaces";

interface HeadersInterface {
  title: string;
  parentClassName?: string;
  childClassName?: string;
}

const TableEmptyRow = ({
  message,
  colSpan,
}: {
  message: string;
  colSpan: number;
}) => (
  <tr className="bg-C_F7F7F7">
    <td className="pl-4 text-center first:rounded-r_0625" colSpan={colSpan}>
      {message}
    </td>
  </tr>
);
export const DataTable = async ({
  headers,
  data,
  meta,
  isPropertyTable,
}: {
  headers: HeadersInterface[];
  data: PropertyCardProps[];
  meta: any;
  isPropertyTable?: boolean;
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-[0.69rem]">
          <thead>
            <tr>
              <th className="font_med_8 border-y border-C_DEDEDE py-[0.94rem] pl-4 text-start text-C_6E6E6E">
                <div className="flex items-center whitespace-nowrap">Sr No</div>
              </th>
              {headers?.map((el, index) => (
                <th key={index} className={`${el?.parentClassName} px-4`}>
                  {el?.childClassName ? (
                    <div className={el?.childClassName}>{el?.title}</div>
                  ) : (
                    el?.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isPropertyTable &&
              (data?.length ? (
                <PropertyCard data={data} />
              ) : (
                <TableEmptyRow message="No properties found" colSpan={10} />
              ))}
            {!isPropertyTable && (
              <TableEmptyRow message="No data found" colSpan={10} />
            )}
          </tbody>
        </table>
      </div>
      {meta?.pagination?.total && (
        <Pagination totalItem={meta?.pagination?.total || 5} />
      )}
    </>
  );
};
