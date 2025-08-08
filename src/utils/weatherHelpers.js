// Returns today's rain probability percentage
export function getRainChanceToday(list) {
  const today = new Date().toDateString();
  const rainChances = list.filter(item => {
    return new Date(item.dt_txt).toDateString() === today;
  }).map(item => item.pop * 100); // 'pop' is probability of precipitation (0 to 1)

  const maxChance = Math.max(...rainChances, 0);
  return Math.round(maxChance);
}

export function getCurrentWeatherCondition(list) {
  return list[0]?.weather[0]?.main || 'Unknown';
}

// Returns timeline of rain % for today (for graph)
export function rainTimelineToday(list) {
  const today = new Date().getDate();
  return list
    .filter(item => new Date(item.dt_txt).getDate() === today)
    .map(item => ({
      time: item.dt_txt.split(" ")[1].slice(0, 5), // extract "HH:MM"
      rainChance: Math.round(item.pop * 100),
    }));
}

// Suggest good laundry time blocks based on rain chance
export function getGoodLaundryTimes(list) {
  const today = new Date().getDate();
  return list
    .filter(item => new Date(item.dt_txt).getDate() === today && item.pop < 0.2)
    .map(item => item.dt_txt.split(" ")[1].slice(0, 5)); // return times like "09:00"
}

// Gives a laundry suggestion based on rain and weather
export function getLaundrySuggestion(rain, condition) {
  if (rain > 60 || condition === "Rain" || condition === "Thunderstorm") {
    return "Not a good day for laundry. Consider drying indoors.";
  } else if (rain > 30) {
    return "Be cautious. Try earlier or later depending on the timeline.";
  } else {
    return "It's a great day for laundry!";
  }
}