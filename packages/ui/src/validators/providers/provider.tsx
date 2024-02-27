import React, { ReactNode, useState } from 'react'
import { map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { perbillToPercent } from '@/common/utils'

import { Validator, ValidatorWithDetails } from '../types'

import { ValidatorsContext } from './context'
import { CommonValidatorsQueries, useValidatorsQueries } from './useValidatorsQueries'
import { ValidatorDetailsOptions, useValidatorsWithDetails } from './useValidatorsWithDetails'

interface Props {
  children: ReactNode
}

export interface UseValidators {
  setShouldFetchValidators: (shouldFetchValidators: boolean) => void
  setValidatorDetailsOptions: (options: ValidatorDetailsOptions) => void
  validators?: Validator[]
  validatorsWithDetails?: ValidatorWithDetails[]
  size?: number
  validatorsQueries?: CommonValidatorsQueries
}

export const ValidatorContextProvider = (props: Props) => {
  const { api } = useApi()

  const [shouldFetchValidators, setShouldFetchValidators] = useState(false)

  const allValidators = useFirstObservableValue(() => {
    if (!shouldFetchValidators) return

    return api?.query.staking.validators.entries().pipe(
      map((entries) =>
        entries.map((entry) => ({
          stashAccount: entry[0].args[0].toString(),
          commission: perbillToPercent(entry[1].commission.toBn()),
        }))
      )
    )
  }, [api?.isConnected, shouldFetchValidators])

  const allValidatorsWithCtrlAcc = useFirstObservableValue(() => {
    if (!allValidators) return

    return api?.query.staking.bonded.multi(allValidators.map((validator) => validator.stashAccount)).pipe(
      map((entries) =>
        entries.map((entry, index) => {
          const validator = allValidators[index]
          const controllerAccount = entry.isSome ? entry.unwrap().toString() : undefined
          return { ...validator, controllerAccount }
        })
      )
    )
  }, [allValidators, api?.isConnected])

  const validatorsQueries = useValidatorsQueries()

  const { validatorsWithDetails, size, setValidatorDetailsOptions } = useValidatorsWithDetails(
    allValidatorsWithCtrlAcc,
    validatorsQueries
  )

  const value = {
    setShouldFetchValidators,
    setValidatorDetailsOptions,
    validators: allValidatorsWithCtrlAcc,
    validatorsWithDetails,
    size,
    validatorsQueries,
  }

  return <ValidatorsContext.Provider value={value}>{props.children}</ValidatorsContext.Provider>
}
