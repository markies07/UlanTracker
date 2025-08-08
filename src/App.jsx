import React, { useEffect, useState } from 'react'
import Weather from './components/Weather'
import Details from './components/Details'
import {
  getRainChanceToday,
  getCurrentWeatherCondition,
  rainTimelineToday,
  getGoodLaundryTimes,
  getLaundrySuggestion,
} from "./utils/weatherHelpers";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null)
  const [rainChance, setRainChance] = useState(null);
  const [conditionNow, setConditionNow] = useState('');
  const [rainGraph, setRainGraph] = useState([]);
  const [goodTimes, setGoodTimes] = useState([]);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=9e20a4ce1c78fc3df2ac58f4fc67ca27&units=metric`);
      const data = await res.json();

      setWeatherData(data);
      setLocation(data.city.name + ', ' + data.city.country)

      const rain = getRainChanceToday(data.list);
      const condition = getCurrentWeatherCondition(data.list);
      const timeline = rainTimelineToday(data.list);
      const laundryTimes = getGoodLaundryTimes(data.list);
      const laundrySuggestion = getLaundrySuggestion(rain, condition);

      setRainChance(rain);
      setConditionNow(condition);
      setRainGraph(timeline);
      setGoodTimes(laundryTimes);
      setSuggestion(laundrySuggestion);
    });
  }, []);

  if (!weatherData) return <p>Loading weather data...</p>;


  return (
    <div className='font-poppins'>
      <Weather rainChance={rainChance} condition={conditionNow} location={location} />
      <Details />
    </div>
  )
}

export default App

// const API_KEY = '9e20a4ce1c78fc3df2ac58f4fc67ca27';
