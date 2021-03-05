import { useState } from 'react'

export function useToggle(): [boolean, () => void] {
  const [isActive, setIsActive] = useState(false)

  return [isActive, () => setIsActive(!isActive)]
}
