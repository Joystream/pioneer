import { useContext, useEffect } from 'react'

import { ValidatorsContext } from '../providers/context'

type Props = { skip?: boolean }

export const useValidators = ({ skip = false }: Props = {}) => {
  const { setShouldFetchValidators, allValidators, allValidatorsWithCtrlAcc, validatorsWithMembership } =
    useContext(ValidatorsContext)

  useEffect(() => {
    if (!skip) setShouldFetchValidators(true)
  }, [])

  return { allValidators, allValidatorsWithCtrlAcc, validatorsWithMembership }
}
