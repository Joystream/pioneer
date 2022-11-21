export const useCustomEvent = () => {
  const onEvent = (eventType: string, listener: any) => {
    document.addEventListener(eventType, listener)
  }

  const offEvent = (eventType: string, listener: any) => {
    document.removeEventListener(eventType, listener)
  }

  const onceEvent = (eventType: string, listener: any) => {
    const handleEventOnce = (event: any) => {
      listener(event)
      offEvent(eventType, handleEventOnce)
    }

    onEvent(eventType, handleEventOnce)
  }

  const triggerEvent = (eventType: string, data: any) => {
    const event = new CustomEvent(eventType, { detail: data })
    document.dispatchEvent(event)
  }

  return { onEvent, offEvent, onceEvent, triggerEvent }
}
