import { createContext } from 'react'

import { Confirm2Props } from '@/common/providers/confirm2/types'

interface Confirm2Context {
  isConfirmed: Confirm2Props
  setIsConfirmed: (confirmAction: Confirm2Props) => void
}

export const Confirm2Context = createContext<Confirm2Context>({
  isConfirmed: null,
  setIsConfirmed: () => {
    return null
  },
})
