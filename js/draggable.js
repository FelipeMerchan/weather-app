const defaultOptions = {
  open: true,
  debug: true,
  animatable: true,
}

export function draggable($element, options = defaultOptions) {
  if (!($element instanceof HTMLElement)) {
    return console.warn(`Elemento inválido. Se esperaba un HTMLElement y se recibió ${$element}`)
  }

  let isOpen = options.open
  let isDragging = false
  const elementRect = $element.getBoundingClientRect()
  const ELEMENT_BLOCK_SIZE = elementRect.height
  const $marker = $element.querySelector("[data-marker]")
  const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height

  const VISIBLE_Y_POSITION = 0
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
  let widgetPosition = VISIBLE_Y_POSITION
  isOpen ? open() : close()

  function handleClick(event) {
    logger("Click")
    toggle()
  }

  function toggle() {
    if(!isDragging) {
      if (!isOpen) {
        return open()
      }
      return close()
    }
  }

  function handlePointerDown() {
    logger("Pointer DOWN")
  }

  function handlePointerUp() {
    logger("Pointer UP")
  }

  function handlePointerOut() {
    logger("Pointer OUT")
  }

  function handlePointerCancel() {
    logger("Pointer CANCEL")
  }

  function handlePointerMove() {
    logger("Pointer MOVE")
  }

  $marker.addEventListener("click", handleClick)
  $marker.addEventListener("pointerdown", handlePointerDown)
  $marker.addEventListener("pointerup", handlePointerUp)
  $marker.addEventListener("pointerout", handlePointerOut)
  $marker.addEventListener("pointercancel", handlePointerCancel)
  $marker.addEventListener("pointermove", handlePointerMove)

  function logger(message) {
    if (options.debug) {
      console.info(message)
    }
  }

  function open() {
    logger("Abrir widget")
    isOpen = true
    widgetPosition = VISIBLE_Y_POSITION
    setWidgetPosition(widgetPosition)
  }

  function close() {
    logger("Cerrar widget")
    isOpen = false
    widgetPosition = HIDDEN_Y_POSITION
    setWidgetPosition(widgetPosition)
  }

  function setWidgetPosition(value) {
    $element.style.marginBottom = `-${value}px`
  }
}