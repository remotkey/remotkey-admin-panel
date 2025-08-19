import { LocalStorageKey } from "../enums";
import { IdNameProps } from "../interfaces";
import { isClient } from "../utils";

export const getDataFromLocalStorage = () => {
  const initialData = {
    cityList: [] as IdNameProps[],
  };

  if (isClient()) {
    initialData.cityList = JSON.parse(
      localStorage.getItem(LocalStorageKey?.CITY_LIST) || JSON.stringify([])
    );
  }

  return initialData;
};
