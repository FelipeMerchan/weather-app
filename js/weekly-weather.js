import { getWeeklyWeather } from "./services/weather.js"
import { getLatLon } from "./geolocation.js"

function configWeeklyWeather() {

}

export async function weeklyWeather() {
  const { lat, lon, isError } = await getLatLon()
  if (isError) return console.log("Ha ocurrido un error ubicándote")
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log("Ha ocurrido un error obteniendo el pronóstico del clima")
  debugger
  configWeeklyWeather(weather)
}