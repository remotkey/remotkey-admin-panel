import Search from "@/common/components/atoms/Search";
import { SelectDropdown } from "@/common/components/atoms/SelectDropdown";
import { SORT_BY_DATA } from "@/common/constants";

export const InquiryFilters = () => {
  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      <div className="flex items-center justify-between">
        <div className="font_bold_5 whitespace-nowrap">All Inquiries</div>
      </div>
      <div className="flex gap-[0.62rem]">
        <Search />
        <SelectDropdown
          className="w-32"
          placeholder="Sort By"
          data={SORT_BY_DATA}
        />
      </div>
    </div>
  );
};
