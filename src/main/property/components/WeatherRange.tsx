import { COLOR_PALETTE } from "@/common/theme/colors";
import { Icon } from "@/lib/next-image/Icon";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { getWetherByLocation } from "../api/server";

type WeatherData = {
  dt_txt: string;
  main: {
    temp_min?: number;
    temp_max?: number;
    humidity?: number;
  };
  wind: {
    speed?: number;
  };
  weather: Array<{
    icon: string;
  }>;
};

type ForecastResponse = {
  cod: string;
  list: WeatherData[];
};

type ForecastDay = {
  date: string;
  minTemp: number;
  maxTemp: number;
  day: WeatherData;
};

export const WeatherRange = async ({ placeName }: { placeName: string }) => {
  if (!placeName) return null;

  const forecast: ForecastResponse = await getWetherByLocation({
    place: placeName,
  });
  if (forecast.cod !== "200") return null;

  const uniqueDays = forecast.list.reduce<ForecastDay[]>((acc, current) => {
    const date = new Date(current.dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
    });

    const existingDay = acc.find((entry) => entry.date === date);
    if (existingDay) {
      existingDay.minTemp = Math.min(
        existingDay.minTemp,
        current.main.temp_min ?? Infinity
      );
      existingDay.maxTemp = Math.max(
        existingDay.maxTemp,
        current.main.temp_max ?? -Infinity
      );
    } else {
      acc.push({
        date,
        minTemp: current.main.temp_min ?? 0,
        maxTemp: current.main.temp_max ?? 0,
        day: current,
      });
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-C_C7C7C7 p-6">
      <span className="mb-4 text-center text-2xl font-semibold text-C_002E2E">
        Weekly Weather Forecast for {placeName}
      </span>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-6">
        {uniqueDays.map(({ date, minTemp, maxTemp, day }, index) => (
          <div
            key={index}
            className={`flex flex-col items-center rounded-lg p-4 shadow-sm ${
              index === 0
                ? "border border-green-300 bg-green-100"
                : "bg-gray-50"
            }`}>
            <span className="text-lg font-medium text-C_002E2E">{date}</span>
            <Icon
              src={`https://openweathermap.org/img/wn/${day.weather[0]?.icon}@4x.png`}
              size={80}
              alt="Weather Icon"
            />
            <span className="whitespace-nowrap text-sm font-bold text-C_002E2E">
              {minTemp.toFixed(1)}°F - {maxTemp.toFixed(1)}°F
            </span>
            <div className="mt-2 flex items-center">
              <WiHumidity
                size={24}
                className="mr-2"
                color={COLOR_PALETTE.C_5EBE76}
              />
              <span className="text-sm text-C_002E2E">
                {day.main.humidity ?? 0}%
              </span>
            </div>
            <div className="mt-1 flex items-center">
              <FiWind
                size={24}
                className="mr-2"
                color={COLOR_PALETTE.C_5EBE76}
              />
              <span className="text-sm text-C_002E2E">
                {day.wind.speed ?? 0} MPH
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
