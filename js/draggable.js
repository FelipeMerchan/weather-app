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
  let startY = 0

  function handleClick(event) {
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

  function pageY(event) {
    return event.pageY || event.touches[0].pageY
  }

  function setAnimations() {
    $element.style.transition = "margin-bottom .3s"
  }

  function bounce() {
    if (widgetPosition < ELEMENT_BLOCK_SIZE / 2) {
      return open()
    }
    return close()
  }

  function dragEnd() {
    isDragging = false
    bounce()
  }

  function startDrag(event) {
    isDragging = true
    startY = pageY(event)
  }

  function handlePointerDown(event) {
    startDrag(event)
  }

  function handlePointerUp() {
    dragEnd()
  }

  function handlePointerOut() {
    dragEnd()
  }

  function handlePointerCancel() {
    dragEnd()
  }

  function handlePointerMove(event) {
    drag(event)
  }

  $marker.addEventListener("click", handleClick)
  $marker.addEventListener("pointerdown", handlePointerDown)
  $marker.addEventListener("pointerup", handlePointerUp)
  $marker.addEventListener("pointerout", handlePointerOut)
  $marker.addEventListener("pointercancel", handlePointerCancel)
  $marker.addEventListener("pointermove", handlePointerMove)
  if (options.aniamtable) {
    setAnimations()
  }

  function logger(message) {
    if (options.debug) {
      console.info(message)
    }
  }

  function open() {
    isOpen = true
    widgetPosition = VISIBLE_Y_POSITION
    setWidgetPosition(widgetPosition)
  }

  function close() {
    isOpen = false
    widgetPosition = HIDDEN_Y_POSITION
    setWidgetPosition(widgetPosition)
  }

  function setWidgetPosition(value) {
    $element.style.marginBottom = `-${value}px`
  }

  function drag(event) {
    const cursorY = pageY(event)
    const movementY = cursorY - startY
    widgetPosition = widgetPosition + movementY
    startY = cursorY
    if (widgetPosition > HIDDEN_Y_POSITION) {
      return false
    }
    setWidgetPosition(widgetPosition)
  }
}