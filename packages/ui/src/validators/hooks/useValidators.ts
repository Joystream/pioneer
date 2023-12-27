import { useContext, useEffect } from 'react'

import { ValidatorsContext } from '../providers/context'

export const useValidators = () => {
  const { setShouldFetchValidators, allValidators, allValidatorsWithCtrlAcc, validatorsWithMembership } =
    useContext(ValidatorsContext)

  useEffect(() => {
    setShouldFetchValidators(true)
  }, [])

  return { allValidators, allValidatorsWithCtrlAcc, validatorsWithMembership }
}
