import { getWeeklyWeather } from "./services/weather.js"
import { getLatLon } from "./geolocation.js"
import { formatWeekList } from "./utils/format-data.js"
import { createDOM } from "./utils/dom.js"
import { createPeriodTime } from "./period-time.js"
import { createWeatherMetrics } from "./weather-metrics.js"
import { draggable } from "./draggable.js"
import { showWeatherMetrics } from "./daytime-tabs.js"

function tabPanelTemplate(id) {
  return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
      <div id="dayWeather-${id}">
        <ul class="dayWeather-list" id="dayWeather-list-${id}">
        </ul>
      </div>
    </div>
  `
}

function createTabPanel(id) {
  const $panel = createDOM(tabPanelTemplate(id))
  if (id > 0) {
    $panel.hidden = true
  }
  return $panel
}

function configWeeklyWeather(weekList) {
  const $container = document.querySelector(".tabs")
  weekList.forEach((day, tabPanelindex) => {
    const $panel = createTabPanel(tabPanelindex)
    $container.append($panel)
    day.forEach((weather, index) => {
      $panel.querySelector(".dayWeather-list").append(createPeriodTime(weather, tabPanelindex, index))
      $panel.querySelector(`#dayWeather-${tabPanelindex}`).append(createWeatherMetrics(weather, tabPanelindex, index))
    })
  })
  showWeatherMetrics()
}

export async function weeklyWeather() {
  const $container = document.querySelector(".weeklyWeather")
  const { lat, lon, isError } = await getLatLon()
  if (isError) return console.log("Ha ocurrido un error ubicándote")
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log("Ha ocurrido un error obteniendo el pronóstico del clima")
  const weekList = formatWeekList(weather.list)
  configWeeklyWeather(weekList)
  draggable($container)
}