import weather from "../data/current-weather.js"

function setCurrentCity($el, city) {
  $el.textContent = city
}

function configCurrentWeather(weather) {
  //city
  const $currentWeatherCity = document.querySelector("#current-weather-city")
  const city = weather.name
  setCurrentCity($currentWeatherCity, city)
}

export function currentWeather() {
  configCurrentWeather(weather)
}