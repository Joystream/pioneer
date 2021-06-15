import React, { Dispatch, SetStateAction, useEffect } from 'react'

export function useOutsideClick(
  container: React.RefObject<any>,
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
) {
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
      const clickedOutside = !container.current?.contains(target)
      if (clickedOutside) {
        setOpen(false)
        window.removeEventListener('mousedown', closePopup)
      }
    }

    window.addEventListener('mousedown', closePopup)
    return () => window.removeEventListener('mousedown', closePopup)
  }, [isOpen])
}
