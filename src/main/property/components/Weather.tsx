import { COLOR_PALETTE } from "@/common/theme/colors";
import { Icon } from "@/lib/next-image/Icon";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { LatLng } from "../interfaces";
import { getWeatherByLocation } from "../api/server";

type ForecastDay = {
  date: string;
  day: any;
};

export const Weather = async ({ location }: { location: LatLng }) => {
  if (!location) return null;

  const forecast = await getWeatherByLocation({ location });
  if (forecast.cod !== "200") return null;

  const uniqueDays = forecast?.list.reduce((acc: ForecastDay[], current) => {
    const date = new Date(current.dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (!acc.some((entry) => entry.date === date)) {
      acc.push({ date, day: current });
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-C_C7C7C7 p-6">
      <span className="mb-4 text-center text-2xl font-semibold text-C_002E2E">
        Weekly Weather Forecast for {location?.place}
      </span>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-6">
        {uniqueDays.map(({ date, day }, index) => (
          <div
            key={index}
            className={`flex flex-col items-center rounded-lg p-4 shadow-sm ${
              index === 0
                ? "border border-green-300 bg-green-100"
                : "bg-gray-50"
            }`}>
            <span className="text-lg font-medium text-C_002E2E">{date}</span>
            <Icon
              src={`https://openweathermap.org/img/wn/${day?.weather[0]?.icon}@4x.png`}
              size={80}
              alt="Weather Icon"
            />
            <span className="text-xl font-bold text-C_002E2E">
              {day?.main?.temp?.toFixed(2)}°F
            </span>
            <div className="mt-2 flex items-center">
              <WiHumidity
                size={24}
                className="mr-2"
                color={COLOR_PALETTE.C_5EBE76}
              />
              <span className="text-sm text-C_002E2E">
                {day?.main?.humidity}%
              </span>
            </div>
            <div className="mt-1 flex items-center">
              <FiWind
                size={24}
                className="mr-2"
                color={COLOR_PALETTE.C_5EBE76}
              />
              <span className="text-sm text-C_002E2E">
                {day?.wind?.speed} MPH
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
