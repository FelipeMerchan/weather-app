import weather from "../data/current-weather.js"
import { formatDate } from "./utils/format-data.js"

function setCurrentCity($el, city) {
  $el.textContent = city
}

function setCurrentDate($el) {
  const date = new Date()
  const formattedDate = formatDate(date)
  $el.textContent = formattedDate
}

function configCurrentWeather(weather) {
  //date
  const $currentWeatherDate = document.querySelector("#current-weather-date")
  setCurrentDate($currentWeatherDate)

  //city
  const $currentWeatherCity = document.querySelector("#current-weather-city")
  const city = weather.name
  setCurrentCity($currentWeatherCity, city)
}

export function currentWeather() {
  configCurrentWeather(weather)
}