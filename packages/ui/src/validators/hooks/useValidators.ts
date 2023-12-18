import { useContext } from 'react'

import { ValidatorsContext } from '../providers/context'

export const useValidators = () => useContext(ValidatorsContext)
