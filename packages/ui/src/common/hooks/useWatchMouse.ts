import { useEffect, useState } from 'react'

import { useThrottle } from '@/common/hooks/useThrottle'

interface UseWatchMouseHandlers {
  onMouseMove: (evt: MouseEvent) => void
  onMouseUp?: (evt: MouseEvent) => void
  onMouseDown?: (evt: MouseEvent) => void
}

export const useWatchMouse = ({ onMouseMove, onMouseUp, onMouseDown }: UseWatchMouseHandlers, initial = false) => {
  const [watch, setWatch] = useState(initial)

  const throttledMouseMove = useThrottle(onMouseMove, 100)

  useEffect(() => {
    if (!watch) return

    window.addEventListener('mousemove', throttledMouseMove)
    onMouseUp && window.addEventListener('mouseup', onMouseUp)
    onMouseDown && window.addEventListener('mousedown', onMouseDown)

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      onMouseUp && window.removeEventListener('mouseup', onMouseUp)
      onMouseDown && window.removeEventListener('mousedown', onMouseDown)
    }
  }, [watch])

  return setWatch
}
