const defaultOptions = {
  open: true,
  debug: true,
  animatable: true,
}

export function draggable($element, options = defaultOptions) {
  if (!($element instanceof HTMLElement)) {
    return console.warn(`Elemento inválido. Se esperaba un HTMLElement y se recibió ${$element}`)
  }

  function logger(message) {
    if (options.debug) {
      console.info(message)
    }
  }
}