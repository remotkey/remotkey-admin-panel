import { COLOR_PALETTE } from "@/common/theme/colors";
import { Icon } from "@/lib/next-image/Icon";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { getWetherByLocation } from "../api/server";

export const Weather = async ({ placeName }: { placeName: string }) => {
  if (!placeName) {
    return null;
  }

  const weather = await getWetherByLocation({
    place: placeName,
  });
  if (weather.cod !== 200) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-C_C7C7C7 p-6">
      {weather && (
        <Icon
          src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@4x.png`}
          size={100}
          alt="Weather"
        />
      )}
      <span className="mb-2 text-4xl font-bold text-C_002E2E">
        {(weather?.main?.temp).toFixed(2)}°C
      </span>
      <span className="mb-6 text-lg font-medium text-gray-600">
        {placeName}
      </span>
      <div className="flex gap-12">
        <div className="flex items-center">
          <WiHumidity
            size={40}
            className="mr-3"
            color={COLOR_PALETTE.C_5EBE76}
          />
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-C_002E2E">
              {weather?.main?.humidity}%
            </span>
            <span className="text-sm text-C_8F8F8F">Humidity</span>
          </div>
        </div>
        <div className="flex items-center">
          <FiWind size={40} className="mr-3" color={COLOR_PALETTE.C_5EBE76} />
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-C_002E2E">
              {(weather?.wind?.speed * 3.6).toFixed(2)} km/h
            </span>
            <span className="text-sm text-C_8F8F8F">Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
