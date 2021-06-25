import { useEffect } from 'react'

export function useOutsideClick(
  container: HTMLDivElement | HTMLSpanElement | null,
  isOpen: boolean,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen || !container) {
      return
    }

    const closePopup = (event: MouseEvent) => {
      event.stopPropagation()
      if (!event.target) {
        return
      }

      const target = event.target as Node
      const clickedOutside = !container?.contains(target)
      if (clickedOutside) {
        onClose()
        window.removeEventListener('mousedown', closePopup)
      }
    }

    window.addEventListener('mousedown', closePopup)
    return () => window.removeEventListener('mousedown', closePopup)
  }, [isOpen, container])
}
