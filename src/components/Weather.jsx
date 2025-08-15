import React, { useMemo } from 'react';
import sunnyBg from '../assets/sunny-bg.webp';
import rainyBg from '../assets/rainy-bg.webp';
import nightBg from '../assets/night-bg.webp';
import rainynightBg from '../assets/rainynight-bg.webp';
import sunny from '../assets/sunny-icon.svg';
import night from '../assets/night-icon.svg';
import cloudyDay from '../assets/cloudy-day.svg';
import cloudyNight from '../assets/cloudy-night.svg';
import rainy from '../assets/rainy-icon.svg';
import storm from '../assets/storm-icon.svg';
import locationIcon from '../assets/location.svg';

function Weather({ rainChance, condition, location, loading }) {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;

  // Memoize weather assets for better performance
  const { weatherIcon, backgroundImage } = useMemo(() => {
    let icon = sunny;
    let bg = sunnyBg;

    if (loading || !condition) {
      // Default loading state based on time
      icon = isDay ? sunny : night;
      bg = isDay ? sunnyBg : nightBg;
    } else {
      if (condition === "clear") {
        icon = isDay ? sunny : night;
        bg = isDay ? sunnyBg : nightBg;
      } 
      else if (condition === "cloudy") {
        icon = isDay ? cloudyDay : cloudyNight;
        bg = isDay ? sunnyBg : nightBg;
      } 
      else if (condition === "raining") {
        icon = rainy;
        bg = isDay ? rainyBg : rainynightBg;
      } 
      else if (condition === "thunderstorm") {
        icon = storm;
        bg = isDay ? rainyBg : rainynightBg;
      }
    }

    return { weatherIcon: icon, backgroundImage: bg };
  }, [condition, isDay, loading]);

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center pb-7 h-auto self-stretch md:flex md:flex-col md:justify-between relative md:p-0 md:w-72 lg:w-96 text-white"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent z-0"></div>

      {/* TITLE */}
      <div className="p-5 relative z-10">
        <h1 className="text-sm font-medium lg:text-base">Mag lalaba ka Love?</h1>

        {/* WEATHER ICON */}
        <div className="absolute bg-white w-16 h-14 top-0 md:top-3 md:right-3 flex justify-center items-center right-0 rounded-bl-2xl md:rounded-lg">
          {loading ? (
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin"></div>
          ) : (
            <img className="w-10" src={weatherIcon} alt="Weather icon" />
          )}
        </div>
      </div>

      {/* RAIN PERCENTAGE */}
      <div className="relative">
        <div className="flex justify-center flex-col items-center md:items-start px-5 pb-7">
          <h1 className="font-black text-7xl">
            {loading ? (
              <span className="animate-pulse">--</span>
            ) : (
              <>
                {rainChance ?? 0}
                <span className="font-normal">%</span>
              </>
            )}
          </h1>
          <p className="font-semibold text-lg leading-3">uulan</p>
        </div>

        {/* LOCATION */}
        <div className="flex justify-center items-center md:justify-start px-5 gap-2 pb-3">
          <img className="w-[10px]" src={locationIcon} alt="Location icon" />
          <p className="text-xs">
            {loading ? (
              <span className="animate-pulse">Getting location...</span>
            ) : (
              location || "Unknown location"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Weather;