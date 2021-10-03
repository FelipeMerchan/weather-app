function handleSelectDayTimeTabClick(event) {
  const $tabSelected = event.currentTarget
  const parentId = event.currentTarget.parentElement.id
  const $tabActive = document.querySelector(`#${parentId} .dayWeather-item.is-selected`)
  $tabActive.classList.remove("is-selected")
  $tabSelected.classList.add("is-selected")

  const id = $tabSelected.id
  const $weatherMetricsPanel = document.querySelector(`#${parentId} ~ [aria-labelledby=${id}]`)
  const $weatherMetricsPanelSelected = document.querySelector(`#${parentId} ~ .weatherMetrics:not([hidden])`)
  $weatherMetricsPanel.hidden = false
  $weatherMetricsPanelSelected.hidden = true
}

export function showWeatherMetrics() {
  const $dayWeatherListAsArray = [...document.querySelectorAll(".dayWeather-item")]
  $dayWeatherListAsArray.forEach(($dayWeatherItem) => {
    $dayWeatherItem.addEventListener("click", handleSelectDayTimeTabClick)
  })
}