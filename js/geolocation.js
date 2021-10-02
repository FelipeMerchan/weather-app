function geolocationSuppport() {
  if ("geolocation" in navigator) {
    return true
  }

  return false
}

export function getCurrentPosition() {
  if (!geolocationSuppport()) throw new Error("No hay soporte de geolocalización en tu navegador")

  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    console.log(latitude)
  })
}