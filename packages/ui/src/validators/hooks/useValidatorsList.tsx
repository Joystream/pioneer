import { useContext, useEffect, useState } from 'react'

import { encodeAddress } from '@/accounts/model/encodeAddress'

import { ValidatorsContext } from '../providers/context'
import { Verification, State, ValidatorWithDetails } from '../types'

export const useValidatorsList = () => {
  const [search, setSearch] = useState('')
  const [isVerified, setIsVerified] = useState<Verification>(null)
  const [isActive, setIsActive] = useState<State>(null)
  const [visibleValidators, setVisibleValidators] = useState<ValidatorWithDetails[]>([])
  const { setShouldFetchValidators, setShouldFetchExtraDetails, validatorsWithDetails } = useContext(ValidatorsContext)

  useEffect(() => {
    setShouldFetchValidators(true)
    setShouldFetchExtraDetails(true)
  }, [])

  useEffect(() => {
    if (validatorsWithDetails) {
      setVisibleValidators(
        validatorsWithDetails
          .filter((validator) => {
            if (isActive === 'active') return validator.isActive
            else if (isActive === 'waiting') return !validator.isActive
            else return true
          })
          .filter((validator) => {
            if (isVerified === 'verified') return validator.isVerifiedValidator
            else if (isVerified === 'unverified') return !validator.isVerifiedValidator
            else return true
          })
          .filter((validator) => {
            return (
              encodeAddress(validator.stashAccount).includes(search) || validator.membership?.handle.includes(search)
            )
          })
      )
    }
  }, [validatorsWithDetails, search, isVerified, isActive])

  return {
    visibleValidators,
    length: visibleValidators.length,
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
