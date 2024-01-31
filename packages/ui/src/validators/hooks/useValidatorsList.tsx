import { useContext, useEffect, useMemo, useReducer, useState } from 'react'

import { ValidatorsContext } from '../providers/context'
import { ValidatorDetailsOrder } from '../types'

const VALIDATOR_PER_PAGE = 7
const DESCENDING_KEYS: ValidatorDetailsOrder['key'][] = ['apr']

export const useValidatorsList = () => {
  const [search, setSearch] = useState('')
  const [isVerified, setIsVerified] = useState<boolean>()
  const [isActive, setIsActive] = useState<boolean>()
  const filter = useMemo(() => ({ search, isVerified, isActive }), [search, isVerified, isActive])

  const [order, handleSort] = useReducer(
    (state: ValidatorDetailsOrder, key: ValidatorDetailsOrder['key']) => ({
      key,
      isDescending: key !== state.key ? DESCENDING_KEYS.includes(key) : !state.isDescending,
    }),
    { key: 'default', isDescending: false }
  )

  const {
    validators,
    setShouldFetchValidators,
    setValidatorDetailsOptions,
    validatorsWithDetails,
    size = 0,
    validatorsQueries,
  } = useContext(ValidatorsContext)

  const [page, setPage] = useState(1)
  const pagination = useMemo(
    () => ({
      page,
      handlePageChange: setPage,
      pageCount: Math.ceil(size / VALIDATOR_PER_PAGE),
    }),
    [page, size]
  )

  useEffect(() => {
    setShouldFetchValidators(true)
    setValidatorDetailsOptions({
      filter,
      order,
      start: (page - 1) * VALIDATOR_PER_PAGE,
      end: page * VALIDATOR_PER_PAGE,
    })
  }, [filter, order, page])

  const format = {
    pagination,
    order: { ...order, sortBy: (key: ValidatorDetailsOrder['key']) => () => handleSort(key) },
    filter: {
      search,
      setSearch,
      isVerified,
      setIsVerified,
      isActive,
      setIsActive,
    },
  }
  const allValidatorsCount = validators?.length

  return { validatorsWithDetails, validatorsQueries, allValidatorsCount, format }
}
