"use client";

import { SelectDropdown } from "@/common/components/atoms/SelectDropdown";
import { getDataFromLocalStorage } from "@/common/helpers/getDataFromLocalStorage";

export const CityDropDown = () => {
  const { cityList } = getDataFromLocalStorage();

  return (
    <SelectDropdown
      className="w-44 whitespace-nowrap"
      placeholder="Filter By City"
      data={cityList}
      minWidth={"9.375rem"}
      isCityFilter
    />
  );
};
