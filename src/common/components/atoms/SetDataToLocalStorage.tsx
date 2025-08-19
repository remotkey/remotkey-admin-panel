"use client";

import { useEffect } from "react";

import { LocalStorageKey } from "@/common/enums";
import { getCities } from "@/main/vendor/api/actions";

export const SetDataToLocalStorage = () => {
  const fetchAllApi = async () => {
    try {
      const results = await Promise.allSettled([getCities({})]);

      const [cityResult] = results;

      if (cityResult.status === "fulfilled" && cityResult.value?.code) {
        localStorage.setItem(
          LocalStorageKey?.CITY_LIST,
          JSON.stringify(cityResult.value?.data || [])
        );
      }
    } catch (error) {
      console.error("Unexpected error in SetDataToLocalStorage:", error);
    }
  };

  useEffect(() => {
    fetchAllApi();
  }, []);

  return null;
};
