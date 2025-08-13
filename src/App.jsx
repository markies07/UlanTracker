import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';
import Details from './components/Details';

function App() {
  const [locationName, setLocationName] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState("");
  const [rainChance, setRainChance] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "9e20a4ce1c78fc3df2ac58f4fc67ca27"; // Replace with your key

  function getWeatherCategory(description) {
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "clear";
    if (desc.includes("cloud") || desc.includes("overcast")) return "cloudy";
    if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("shower")) return "raining";
    if (desc.includes("thunderstorm")) return "thunderstorm";
    return "unknown";
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const weatherData = await weatherRes.json();

          const category = getWeatherCategory(weatherData.weather[0].description);

          setLocationName(weatherData.name);
          setTemperature(weatherData.main.temp);
          setCondition(category);

          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const forecastData = await forecastRes.json();

          if (forecastData.list && forecastData.list.length > 0) {
            const firstRainData = forecastData.list[0].pop; // 0–1 probability
            setRainChance(Math.round(firstRainData * 100)); // %
          } else {
            setRainChance(0);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="font-poppins">
      {!loading && (
        <Weather
          rainChance={rainChance}
          condition={condition}
          location={locationName}
          temperature={temperature}
        />
      )}
      <Details />
    </div>
  );
}

export default App;
