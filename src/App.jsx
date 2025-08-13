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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Get weather data
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const weatherData = await weatherRes.json();

          // Extract main weather details
          setLocationName(weatherData.name);
          setTemperature(weatherData.main.temp);
          setCondition(weatherData.weather[0].description);

          // Optional: use forecast API to get rain chance
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const forecastData = await forecastRes.json();

          // Check if forecast data has rain info
          if (forecastData.list && forecastData.list.length > 0) {
            const firstRainData = forecastData.list[0].pop; // probability of precipitation (0–1)
            setRainChance(firstRainData * 100); // convert to %
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

  console.log(temperature)

  // if (loading) {
  //   return <p>Loading weather...</p>;
  // }

  return (
    <div className="font-poppins">
      <p>{temperature}</p>
      <Weather
        rainChance={rainChance}
        condition={condition}
        location={locationName}
        temperature={temperature}
      />
      <Details />
    </div>
  );
}

export default App;
