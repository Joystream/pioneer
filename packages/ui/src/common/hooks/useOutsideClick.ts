import React, { useEffect } from 'react'

export function useOutsideClick(container: React.RefObject<any>, isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closePopup = (event: MouseEvent) => {
      event.stopPropagation()
      if (!event.target) {
        return
      }

      const target = event.target as Node
      const clickedOutside = !container.current.contains(target)

      if (clickedOutside) {
        window.removeEventListener('mousedown', closePopup)
        onClose()
      }
    }

    window.addEventListener('mousedown', closePopup)
    return () => window.removeEventListener('mousedown', closePopup)
  }, [isOpen, container])
}
