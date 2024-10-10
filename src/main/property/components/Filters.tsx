import { Button } from "@/common/components/atoms/Button";
import Search from "@/common/components/atoms/Search";
import { SelectDropdown } from "@/common/components/atoms/SelectDropdown";
import { SORT_BY_DATA } from "@/common/constants";

export const Filters = () => {
  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      <div className="flex items-center justify-between">
        <div className="font_bold_5 whitespace-nowrap">All Properties</div>
        <Button
          url="/add-property"
          icon="/icons/plusWhite.svg"
          className="rounded-r_08125 border border-C_309B5F bg-C_309B5F md:hidden"
          hasBgColor
          text="Add Property"
        />
      </div>
      <div className="flex gap-[0.62rem]">
        <Search />
        <SelectDropdown
          className="w-32"
          placeholder="Sort By"
          data={SORT_BY_DATA}
        />
        <Button
          url="/add-property"
          icon="/icons/plusWhite.svg"
          className="hidden rounded-r_08125 border border-C_309B5F bg-C_309B5F md:flex"
          hasBgColor
          text="Add Property"
        />
      </div>
    </div>
  );
};
