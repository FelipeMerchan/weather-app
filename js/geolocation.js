function geolocationSuppport() {
  if ("geolocation" in navigator) {
    return true
  }

  return false
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximunAge: 100000,
}

export function getCurrentPosition(options) {
  if (!geolocationSuppport()) throw new Error("No hay soporte de geolocalización en tu navegador")

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, () => {
      reject(new Error("No se pudo obtener la posición actual"))
    }, options)
  })
}

export async function getLatLon(options = defaultOptions) {
  try {
    const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options)
    return { lat, lon, isError: false }
  } catch {
    return { isError: true, lat: null, lon: null }
  }
}