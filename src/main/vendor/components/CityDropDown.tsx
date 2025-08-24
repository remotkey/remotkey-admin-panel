"use client";

import { SelectDropdown } from "@/common/components/atoms/SelectDropdown";
import { getDataFromLocalStorage } from "@/common/helpers/getDataFromLocalStorage";
import { CITY_DROPDOWN_LABELS, CITY_DROPDOWN_STYLES } from "../constants";

export const CityDropDown = () => {
  const { cityList } = getDataFromLocalStorage();

  return (
    <SelectDropdown
      className={CITY_DROPDOWN_STYLES.CONTAINER}
      placeholder={CITY_DROPDOWN_LABELS.FILTER_BY_CITY}
      data={cityList}
      minWidth={CITY_DROPDOWN_STYLES.MIN_WIDTH}
      isCityFilter
    />
  );
};
