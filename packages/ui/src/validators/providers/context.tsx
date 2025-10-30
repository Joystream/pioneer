import { createContext } from 'react'

import { UseValidators } from './provider'

export const ValidatorsContext = createContext<UseValidators>({
  setShouldFetchValidators: () => {},
  setValidatorDetailsOptions: () => {},
})
