import React, { useEffect } from 'react'

const isRef = (obj: any): obj is React.RefObject<any> => !!obj.current

export function useOutsideClick(
  refOrElement: React.RefObject<HTMLElement> | HTMLElement | null,
  isOpen: boolean,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen || !refOrElement) {
      return
    }

    let element: HTMLElement | null

    if (isRef(refOrElement)) {
      element = refOrElement.current
    } else {
      element = refOrElement
    }

    if (!element) {
      return
    }

    const closePopup = (event: MouseEvent) => {
      event.stopPropagation()

      if (!event.target || !element) {
        return
      }

      const target = event.target as Node
      const clickedOutside = !element.contains(target)

      if (clickedOutside) {
        window.removeEventListener('mousedown', closePopup)
        onClose()
      }
    }

    window.addEventListener('mousedown', closePopup)
    return () => window.removeEventListener('mousedown', closePopup)
  }, [isOpen, refOrElement])
}
