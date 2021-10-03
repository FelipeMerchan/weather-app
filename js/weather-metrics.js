import { createDOM } from "./utils/dom.js"
import { formatTemp, formatSpeedToKmph } from "./utils/format-data.js"

export function metricsTemplate({
    minTemp,
    maxTemp,
    humidity,
    windSpeed,
    id,
    tabPanelindex
  }) {
  return `
    <div
      class="weatherMetrics"
      aria-labelledby="day-weather-${tabPanelindex}-${id}"
      ${id === 0 ? '' : 'hidden'}
    >
      <span>
        Max: <strong>${maxTemp}</strong>
      </span>
      <span>
        Mín: <strong>${minTemp}</strong>
      </span>
      <span>
        Viento: <strong>${windSpeed}</strong>
      </span>
      <span>
        Humedad: <strong>${humidity}%</strong>
      </span>
    </div>
  `
}

export function createWeatherMetrics (weather, tabPanelindex, index) {
  const minTemp = formatTemp(weather.main.temp_min)
  const maxTemp = formatTemp(weather.main.temp_max)
  const windSpeed = formatSpeedToKmph(weather.wind.speed)
  const config = {
    minTemp,
    maxTemp,
    humidity: weather.main.humidity,
    windSpeed,
    id: index,
    tabPanelindex,
  }
  return createDOM(metricsTemplate(config))
}