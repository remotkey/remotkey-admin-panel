import Search from "@/common/components/atoms/Search";
import { SelectDropdown } from "@/common/components/atoms/SelectDropdown";
import { SORT_BY_DATA } from "@/common/constants";

export const VendorFilter = () => {
  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      <div className="flex items-center justify-between">
        <div className="font_bold_5 whitespace-nowrap">All Vendors</div>
      </div>
      <div className="flex gap-[0.62rem]">
        <Search />
        <SelectDropdown
          className="w-44 whitespace-nowrap"
          placeholder="Filter By City"
          data={SORT_BY_DATA}
        />
        <SelectDropdown
          className="w-32 whitespace-nowrap"
          placeholder="Sort By"
          data={SORT_BY_DATA}
        />
      </div>
    </div>
  );
};
