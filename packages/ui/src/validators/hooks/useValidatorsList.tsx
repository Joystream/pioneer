import { useContext, useEffect, useState } from 'react'

import { ValidatorsContext } from '../providers/context'

export const useValidatorsList = () => {
  const [search, setSearch] = useState('')
  const [isVerified, setIsVerified] = useState<boolean>()
  const [isActive, setIsActive] = useState<boolean>()

  const {
    setShouldFetchValidators,
    setValidatorDetailsFilter,
    validatorsWithDetails = [],
  } = useContext(ValidatorsContext)

  useEffect(() => {
    setShouldFetchValidators(true)
    setValidatorDetailsFilter({ search, isVerified, isActive })
  }, [search, isVerified, isActive])

  return {
    validatorsWithDetails,
    filter: {
      search,
      setSearch,
      isVerified,
      setIsVerified,
      isActive,
      setIsActive,
    },
  }
}
