import { useContext, useEffect, useMemo, useReducer, useState } from 'react'

import { ValidatorsContext } from '../providers/context'
import { ValidatorDetailsOrder } from '../types'

const DESCENDING_KEYS: ValidatorDetailsOrder['key'][] = ['commission']

export const useValidatorsList = () => {
  const [search, setSearch] = useState('')
  const [isVerified, setIsVerified] = useState<boolean>()
  const [isActive, setIsActive] = useState<boolean>()
  const filter = useMemo(() => ({ search, isVerified, isActive }), [search, isVerified, isActive])

  const [order, onSort] = useReducer(
    (state: ValidatorDetailsOrder, key: ValidatorDetailsOrder['key']) => ({
      key,
      isDescending: key !== state.key ? DESCENDING_KEYS.includes(key) : !state.isDescending,
    }),
    { key: 'default', isDescending: false }
  )

  const { setShouldFetchValidators, setValidatorDetailsOptions, validatorsWithDetails } = useContext(ValidatorsContext)

  useEffect(() => {
    setShouldFetchValidators(true)
    setValidatorDetailsOptions({ filter, order })
  }, [filter, order])

  return {
    validatorsWithDetails,
    order: { ...order, sortBy: (key: ValidatorDetailsOrder['key']) => () => onSort(key) },
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
