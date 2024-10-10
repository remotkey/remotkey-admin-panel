import "server-only";

import { getFetcher } from "@/common/fetchers";
import {
  ApiResponseInterface,
  SearchFiltersParamsTypes,
} from "@/common/interfaces";
import { revalidatePath } from "next/cache";
import { PropertyInterface, WeatherResponseInterface } from "../interfaces";

export const getProperties = async (
  params?: SearchFiltersParamsTypes
): Promise<ApiResponseInterface<null>> => {
  const { data, message, code, meta } = await getFetcher("/property", params);

  revalidatePath("/dashboard");
  return {
    data,
    message,
    code,
    meta,
  };
};

export const getPropertyById = async ({
  id,
}: {
  id: string;
}): Promise<ApiResponseInterface<PropertyInterface>> => {
  const { data, message, code } = await getFetcher(`/property?_id=${id}`);
  return {
    data,
    message,
    code,
  };
};

export const getWetherByLocation = async ({
  place,
}: {
  place: string;
}): Promise<WeatherResponseInterface> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${process.env.WEATHER_API_KEY}`
  );

  const data: WeatherResponseInterface = await response.json();
  return data;
};
