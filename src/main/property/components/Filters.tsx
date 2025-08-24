import { Button } from "@/common/components/atoms/Button";
import Search from "@/common/components/atoms/Search";
import { SelectDropdown } from "@/common/components/atoms/SelectDropdown";
import { SORT_BY_DATA } from "@/common/constants";
import { CityDropDown } from "@/main/vendor/components/CityDropDown";

export const Filters = () => {
  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      <div className="flex items-center justify-between">
        <div className="font_bold_5 whitespace-nowrap">All Properties</div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Search />
        <div className="flex gap-[0.62rem]">
          <SelectDropdown
            className="w-32 whitespace-nowrap"
            placeholder="Sort By"
            data={SORT_BY_DATA}
          />
          <CityDropDown />
        </div>
      </div>
    </div>
  );
};
