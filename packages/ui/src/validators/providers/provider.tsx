import React, { ReactNode, useState } from 'react'
import { filter, first, map, of, switchMap } from 'rxjs'

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
    if (!shouldFetchValidators || !api) return

    // Wait for API to be ready (metadata loaded) before making queries
    // This prevents "PortableRegistry has not been set" errors
    const isReady$ =
      'isReady' in api && typeof api.isReady === 'function'
        ? (api.isReady() as any).pipe(
            filter((ready: any) => Boolean(ready)),
            first()
          )
        : api.rpc.chain.getBlockHash(0).pipe(
            first(),
            map(() => true)
          )

    return isReady$.pipe(
      switchMap(() => {
        // Check if entries() method exists (it might not be available on ProxyApi)
        const validatorsQuery = api.query.staking.validators
        if (validatorsQuery && typeof validatorsQuery.entries === 'function') {
          return validatorsQuery.entries().pipe(
            map((entries) =>
              entries.map((entry) => ({
                stashAccount: entry[0].args[0].toString(),
                commission: perbillToPercent(entry[1].commission.toBn()),
              }))
            )
          )
        }

        // Fallback: Use session.validators() to get active validators
        // This only returns active validators, not all validators with preferences set
        return api.query.session.validators().pipe(
          switchMap((activeValidators) => {
            const validatorAddresses = activeValidators.map((v) => v.toString())
            if (validatorAddresses.length === 0) {
              return of([])
            }

            // Get validator preferences for active validators
            return api.query.staking.validators.multi(validatorAddresses).pipe(
              map((prefs: any[]) =>
                prefs
                  .map((pref: any, index: number) => {
                    if (!pref || pref.isEmpty) return null
                    const prefsData = pref.isEmpty ? null : pref.unwrap ? pref.unwrap() : pref
                    if (!prefsData || !prefsData.commission) return null
                    return {
                      stashAccount: validatorAddresses[index],
                      commission: perbillToPercent(prefsData.commission.toBn()),
                    }
                  })
                  .filter((v): v is Validator => v !== null)
              )
            )
          })
        )
      })
    )
  }, [api?.isConnected, shouldFetchValidators])

  const allValidatorsWithCtrlAcc = useFirstObservableValue(() => {
    if (!allValidators || !Array.isArray(allValidators) || allValidators.length === 0 || !api) return

    return api.query.staking.bonded.multi(allValidators.map((validator: Validator) => validator.stashAccount)).pipe(
      map((entries: any[]) =>
        entries.map((entry: any, index: number) => {
          const validator = allValidators[index]
          const controllerAccount = entry && entry.isSome ? entry.unwrap().toString() : undefined
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
