export function setViewportSize($el) {
  const viewportBlockSize = getViewport()
  $el.style.blockSize = `${viewportBlockSize}px`
}

export function getViewport() {
  return window.innerHeight
}

export function onViewportRezise(callback) {
  window.addEventListener("resize", callback)
}

export function offViewportRezise() {
  window.removeEventListener("resize", callback)
}

export function viewportSize($el) {
  setViewportSize($el)

  onViewportRezise(() => setViewportSize($el))
}
