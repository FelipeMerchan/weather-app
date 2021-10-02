import weather from "../data/current-weather.js"
import { formatDate, formatTemp } from "./utils/format-data.js"

function setCurrentCity($el, city) {
  $el.textContent = city
}

function setCurrentDate($el) {
  const date = new Date()
  const formattedDate = formatDate(date)
  $el.textContent = formattedDate
}

function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp)
}

function solarStatus(sunriseTime, sunsetTime) {
  const currentHours = new Date().getHours()
  const sunriseHours = sunriseTime.getHours()
  const sunsetHours = sunsetTime.getHours()

  if (currentHours > sunsetHours || currentHours < sunriseHours) {
    return "night"
  }

  return "morning"
}

function setBackground($el, solarStatus) {
  $el.style.backgroundImage = `url('./images/${solarStatus}-drizzle.jpg')`
}

function configCurrentWeather(weather) {
  //date
  const $currentWeatherDate = document.querySelector("#current-weather-date")
  setCurrentDate($currentWeatherDate)

  //city
  const $currentWeatherCity = document.querySelector("#current-weather-city")
  const city = weather.name
  setCurrentCity($currentWeatherCity, city)

  //temp
  const $currentWeatherTemp = document.querySelector("#current-weather-temp")
  const temp = weather.main.temp
  setCurrentTemp($currentWeatherTemp, temp)

  //background
  const sunriseTime = new Date(weather.sys.sunrise * 1000)
  const sunsetTime = new Date(weather.sys.sunset * 1000)
  const $app = document.querySelector("#app")
  setBackground($app, solarStatus(sunriseTime, sunsetTime))
}

export function currentWeather() {
  configCurrentWeather(weather)
}