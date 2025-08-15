import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';
import Details from './components/Details';
import { HashLoader } from 'react-spinners';

function App() {
  const [locationName, setLocationName] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState("");
  const [rainChance, setRainChance] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "9e20a4ce1c78fc3df2ac58f4fc67ca27"; 

  function getWeatherCategory(description) {
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "clear";
    if (desc.includes("cloud") || desc.includes("overcast")) return "cloudy";
    if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("shower")) return "raining";
    if (desc.includes("thunderstorm")) return "thunderstorm";
    return "unknown";
  }

  function calculateRainChance(weatherData, forecastData) {
    // Get current weather condition
    const currentCondition = getWeatherCategory(weatherData.weather[0].description);
    
    // If it's currently raining, return high probability
    if (currentCondition === "raining" || currentCondition === "thunderstorm") {
      return 85;
    }
    
    // Check humidity and clouds for better rain estimation
    const humidity = weatherData.main.humidity;
    const clouds = weatherData.clouds.all;
    
    let rainProbability = 0;
    
    // Calculate based on current conditions
    if (currentCondition === "cloudy") {
      if (humidity > 80 && clouds > 70) {
        rainProbability = 60;
      } else if (humidity > 70 && clouds > 50) {
        rainProbability = 40;
      } else {
        rainProbability = 20;
      }
    } else if (currentCondition === "clear") {
      if (humidity > 70) {
        rainProbability = 15;
      } else {
        rainProbability = 5;
      }
    }
    
    // Check next few hours forecast for more accuracy
    if (forecastData && forecastData.list && forecastData.list.length > 0) {
      const next3Hours = forecastData.list.slice(0, 3);
      const forecastRain = next3Hours.some(item => {
        const desc = item.weather[0].description.toLowerCase();
        return desc.includes("rain") || desc.includes("drizzle") || desc.includes("shower");
      });
      
      if (forecastRain) {
        rainProbability = Math.max(rainProbability, 70);
      }
      
      // Use forecast probability as secondary indicator
      const avgForecastProb = next3Hours.reduce((sum, item) => sum + (item.pop * 100), 0) / next3Hours.length;
      rainProbability = Math.max(rainProbability, Math.round(avgForecastProb * 0.7)); // Reduce forecast weight
    }
    
    return Math.min(rainProbability, 95); // Cap at 95%
  }

  function processHourlyForecast(forecastData, currentRainChance) {
    if (!forecastData || !forecastData.list) return [];
    
    const currentHour = new Date().getHours();
    const hourlyData = [];
    
    for (let i = 0; i < 8; i++) {
      const hour = (currentHour + i) % 24;
      const displayHour = hour === 0 ? '12A' : 
                         hour < 12 ? `${hour}A` : 
                         hour === 12 ? '12P' : `${hour - 12}P`;
      
      let probability;
      
      // First hour (current) should match the calculated current rain chance
      if (i === 0) {
        probability = currentRainChance;
      } else if (i < forecastData.list.length) {
        // Use forecast data for future hours
        const item = forecastData.list[Math.floor(i / 3)]; // 3-hour intervals
        const condition = getWeatherCategory(item.weather[0].description);
        probability = Math.round(item.pop * 100);
        
        // Adjust based on weather condition for more realistic probabilities
        if (condition === "clear") {
          probability = Math.min(probability, 25);
        } else if (condition === "cloudy") {
          probability = Math.min(probability * 0.8, 65);
        } else if (condition === "raining" || condition === "thunderstorm") {
          probability = Math.max(probability, 70);
        }
      } else {
        // Fallback for hours beyond forecast data
        probability = Math.max(0, currentRainChance + (Math.random() * 20 - 10));
      }
      
      hourlyData.push({
        hour: displayHour,
        probability: Math.max(0, Math.min(100, Math.round(probability)))
      });
    }
    
    return hourlyData;
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch both APIs in parallel for faster loading
            const [weatherRes, forecastRes] = await Promise.all([
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
              fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
            ]);

            const [weatherData, forecastData] = await Promise.all([
              weatherRes.json(),
              forecastRes.json()
            ]);

            const category = getWeatherCategory(weatherData.weather[0].description);
            const calculatedRainChance = calculateRainChance(weatherData, forecastData);
            const hourlyData = processHourlyForecast(forecastData, calculatedRainChance);

            setLocationName(weatherData.name);
            setTemperature(weatherData.main.temp);
            setCondition(category);
            setRainChance(calculatedRainChance);
            setHourlyForecast(hourlyData);
            
            setLoading(false);
          } catch (error) {
            console.error("Error fetching weather:", error);
            // Set fallback data
            setRainChance(0);
            setLoading(false);
          }
        }, (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
        });
      } else {
        alert("Geolocation is not supported by your browser.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="md:bg-[url('./assets/bg.jpg')] font-poppins bg-cover bg-center h-screen md:flex justify-center items-center items-start-on-short overflow-auto">
      {loading ? 
        <div className="fixed inset-0 flex items-center justify-center bg-secondary z-50">
          <HashLoader />
        </div>
        :
        <div className='flex flex-col md:flex-row justify-center items-center h-auto md:shadow-[0_0_10px_rgba(0,0,0,0.3)] md:rounded-lg overflow-hidden'>
          <Weather
            rainChance={rainChance}
            condition={condition}
            location={locationName}
            temperature={temperature}
            loading={loading}
          />
          <Details 
            condition={condition}
            temperature={temperature}
            rainChance={rainChance}
            hourlyForecast={hourlyForecast}
            loading={loading}
          />
        </div>
      }
    </div>
  );
}

export default App;