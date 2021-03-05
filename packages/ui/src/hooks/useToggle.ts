import { useState } from 'react'

export function useToggle(initialState = false): [boolean, () => void] {
  const [isActive, setIsActive] = useState(initialState)

  return [isActive, () => setIsActive(!isActive)]
}
