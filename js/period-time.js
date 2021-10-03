import { createDOM } from "./utils/dom.js"
import { formatDate, formatTemp } from "./utils/format-data.js"

export function periodTimeTemplate({
    temp,
    date,
    icon,
    description,
    index,
    tabPanelindex
  }) {
  return `
    <li
      class="dayWeather-item${index === 0 ? ' is-selected' : ''}"
      id="day-weather-${tabPanelindex}-${index}"
    >
      <span class="dayWeather-time">${date}</span>
      <img
        class="dayWeather-icon"
        height="48"
        width="48"
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt="${description}"
      />
      <span class="dayWeather-temp">${temp}</span>
    </li>
  `
}

export function createPeriodTime(weather, tabPanelindex, index) {
  const dateOptions = {
    hour: "numeric",
    hour12: true,
  }
  const temp = formatTemp(weather.main.temp)
  const date = formatDate(new Date(weather.dt * 1000), dateOptions)
  const config = {
    temp,
    date,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
    index,
    tabPanelindex,
  }
  return createDOM(periodTimeTemplate(config))
}