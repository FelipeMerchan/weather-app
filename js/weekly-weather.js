import { getWeeklyWeather } from "./services/weather.js"
import { getLatLon } from "./geolocation.js"
import { formatWeekList } from "./utils/format-data.js"
import { createDOM } from "./utils/dom.js"

function configWeeklyWeather(weekList) {
  weekList.forEach((item) => {
    const $el = createDOM("<h2>Hey</h2>")
    const $container= document.querySelector(".weeklyWeather")
    $container.append($el)
  })
}

export async function weeklyWeather() {
  const { lat, lon, isError } = await getLatLon()
  if (isError) return console.log("Ha ocurrido un error ubicándote")
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log("Ha ocurrido un error obteniendo el pronóstico del clima")
  const weekList = formatWeekList(weather.list)
  configWeeklyWeather(weekList)
}