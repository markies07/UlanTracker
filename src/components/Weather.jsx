import React from 'react';
import sunnyBg from '../assets/sunny-bg.jpg';
import rainyBg from '../assets/rainy-bg.jpg';
import nightBg from '../assets/night-bg.jpg';
import rainynightBg from '../assets/rainynight-bg.jpg';
import sunny from '../assets/sunny-icon.svg';
import night from '../assets/night-icon.svg';
import cloudy from '../assets/cloudy-icon.svg';
import rainy from '../assets/rainy-icon.svg';
import storm from '../assets/storm-icon.svg';
import locationIcon from '../assets/location.svg';

function Weather({ rainChance, condition, location }) {
  const hour = new Date().getHours();
  let weatherIcon = sunny;
  let backgroundImage = sunnyBg;

  if (condition === "clear") {
    weatherIcon = hour >= 6 && hour < 18 ? sunny : night;
    backgroundImage = hour >= 6 && hour < 18 ? sunnyBg : nightBg;
  } 
  else if (condition === "cloudy") {
    weatherIcon = cloudy;
    backgroundImage = hour >= 6 && hour < 18 ? sunnyBg : nightBg;
  } 
  else if (condition === "raining") {
    weatherIcon = rainy;
    backgroundImage = hour >= 6 && hour < 18 ? rainyBg : rainynightBg;
  } 
  else if (condition === "thunderstorm") {
    weatherIcon = storm;
    backgroundImage = hour >= 6 && hour < 18 ? rainyBg : rainynightBg;
  }

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center pb-7 h-auto relative text-white"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent z-0"></div>

      {/* TITLE */}
      <div className="p-5 relative z-10">
        <h1 className="text-sm font-medium">Mag lalaba ka Love?</h1>

        {/* WEATHER ICON */}
        <div className="absolute bg-white w-16 h-14 top-0 flex justify-center items-center right-0 rounded-bl-2xl">
          <img className="w-10" src={weatherIcon} alt="" />
        </div>
      </div>

      {/* RAIN PERCENTAGE */}
      <div className="relative">
        <div className="flex justify-center flex-col items-center pb-7">
          <h1 className="font-black text-7xl">
            {rainChance}
            <span className="font-normal">%</span>
          </h1>
          <p className="font-semibold text-lg leading-3">uulan</p>
        </div>

        {/* LOCATION */}
        <div className="flex justify-center items-center gap-2 pb-3">
          <img className="w-[10px]" src={locationIcon} alt="" />
          <p className="text-xs">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
