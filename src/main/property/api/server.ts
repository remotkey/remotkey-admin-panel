import "server-only";

import { getFetcher } from "@/common/fetchers";
import {
  ApiResponseInterface,
  SearchFiltersParamsTypes,
} from "@/common/interfaces";
import { revalidatePath } from "next/cache";
import {
  LatLng,
  PropertyInterface,
  WeatherForecastResponseInterface,
} from "../interfaces";

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

export const getWeatherByLocation = async ({
  location,
}: {
  location: LatLng;
}): Promise<WeatherForecastResponseInterface> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.lat}&lon=${location?.lng}&units=imperial&appid=${process?.env?.WEATHER_API_KEY}`
  );

  const data: WeatherForecastResponseInterface = await response.json();
  return data;
};
