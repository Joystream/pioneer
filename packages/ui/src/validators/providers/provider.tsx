import React, { ReactNode, useMemo, useState } from 'react'
import { combineLatest, map, Observable, of, ReplaySubject, share, take } from 'rxjs'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'
import { isDefined, perbillToPercent } from '@/common/utils'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

import { compareValidators, getValidatorsFilters, getValidatorInfo } from '../model'
import {
  Validator,
  ValidatorDetailsFilter,
  ValidatorMembership,
  ValidatorDetailsOrder,
  ValidatorWithDetails,
} from '../types'

import { ValidatorsContext } from './context'

interface Props {
  children: ReactNode
}

type ValidatorDetailsOptions = {
  filter: ValidatorDetailsFilter
  order: ValidatorDetailsOrder
  start: number
  end: number
}

export interface UseValidators {
  setShouldFetchValidators: (shouldFetchValidators: boolean) => void
  setValidatorDetailsOptions: (options: ValidatorDetailsOptions) => void
  validators?: Validator[]
  validatorsWithDetails?: ValidatorWithDetails[]
}

export const ValidatorContextProvider = (props: Props) => {
  const { api } = useApi()

  const [shouldFetchValidators, setShouldFetchValidators] = useState(false)
  const [validatorDetailsOptions, setValidatorDetailsOptions] = useState<ValidatorDetailsOptions>()

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

  const activeValidators$ = useMemo(() => {
    if (!validatorDetailsOptions) return

    return api?.query.session.validators().pipe(
      take(1),
      map((activeAccs) => activeAccs.map(encodeAddress)),
      freezeObservable
    )
  }, [api?.isConnected, !validatorDetailsOptions])

  const filteredValidators = useFirstObservableValue(() => {
    if (!allValidatorsWithCtrlAcc || !validatorDetailsOptions || !activeValidators$) return

    const getAddressesByIsActive = map((activeValidators: string[]) =>
      allValidatorsWithCtrlAcc.filter(
        ({ stashAccount }) => activeValidators.includes(stashAccount) === validatorDetailsOptions.filter.isActive
      )
    )
    return isDefined(validatorDetailsOptions.filter.isActive)
      ? activeValidators$.pipe(getAddressesByIsActive)
      : of(allValidatorsWithCtrlAcc)
  }, [allValidatorsWithCtrlAcc, validatorDetailsOptions?.filter, activeValidators$])

  const variables = useMemo(() => {
    if (!allValidatorsWithCtrlAcc || !validatorDetailsOptions) return

    const addresses = allValidatorsWithCtrlAcc.flatMap(({ stashAccount: stash, controllerAccount: ctrl }) =>
      ctrl ? [stash, ctrl] : [stash]
    )
    const accountsFilter = [
      { rootAccount_in: addresses },
      { controllerAccount_in: addresses },
      { boundAccounts_containsAny: addresses },
    ]

    return { where: { OR: accountsFilter } }
  }, [allValidatorsWithCtrlAcc, !validatorDetailsOptions])

  const { data } = useGetMembersWithDetailsQuery({ variables, skip: !variables })

  const memberships = data?.memberships?.map((rawMembership) => ({
    membership: asMemberWithDetails(rawMembership),
    isVerifiedValidator: rawMembership.metadata.isVerifiedValidator ?? false,
  }))

  const validatorsWithMembership: ValidatorMembership[] | undefined = useMemo(() => {
    if (!memberships || !filteredValidators || !validatorDetailsOptions) return

    const validators = filteredValidators.map((validator) => {
      const { stashAccount, controllerAccount } = validator
      const boundMemberships = memberships
        .filter(
          ({ membership }) =>
            (controllerAccount && membership.boundAccounts.includes(controllerAccount)) ||
            membership.boundAccounts.includes(stashAccount) ||
            membership.controllerAccount === controllerAccount ||
            membership.controllerAccount === stashAccount ||
            membership.rootAccount === controllerAccount ||
            membership.rootAccount === stashAccount
        )
        .sort((a, b) =>
          a.isVerifiedValidator === b.isVerifiedValidator
            ? Number(a.membership.id) - Number(b.membership.id)
            : a.isVerifiedValidator
            ? -1
            : 1
        )

      return { ...validator, ...boundMemberships[0] }
    })

    return getValidatorsFilters(validatorDetailsOptions.filter)
      .reduce(
        (validators: ValidatorMembership[], predicate): ValidatorMembership[] =>
          predicate ? validators.filter(predicate) : validators,
        validators
      )
      .sort((a, b) => {
        const direction = validatorDetailsOptions.order.isDescending ? -1 : 1
        return direction * compareValidators(a, b, validatorDetailsOptions.order.key)
      })
      .slice(validatorDetailsOptions.start, validatorDetailsOptions.end)
  }, [data, filteredValidators, validatorDetailsOptions])

  const validatorsRewards$ = useMemo(() => {
    if (!api || !validatorDetailsOptions) return

    const eraPoints$ = api.query.staking.erasRewardPoints.entries()
    const eraPayouts$ = api.query.staking.erasValidatorReward.entries()

    return combineLatest([eraPoints$, eraPayouts$]).pipe(
      take(1),
      map(([points, payouts]) => {
        const payoutsMap = new Map(payouts.map(([era, amount]) => [era.args[0].toNumber(), amount.value.toBn()]))

        return points
          .map((entry) => {
            const era = entry[0].args[0].toNumber()
            const totalPoints = entry[1].total.toNumber()
            const individual = entry[1].individual.toJSON() as Record<string, number>
            const totalPayout = payoutsMap.get(era) ?? BN_ZERO
            return { era, totalPoints, individual, totalPayout }
          })
          .sort((a, b) => b.era - a.era)
          .slice(1) // Remove the current period
      }),
      freezeObservable
    )
  }, [api?.isConnected, !validatorDetailsOptions])

  const validatorsWithDetails = useObservable(() => {
    if (!api || !validatorsWithMembership || !activeValidators$ || !validatorsRewards$) return

    if (!validatorsWithMembership.length) {
      return of([])
    }

    const validatorsWithDetails$ = validatorsWithMembership.flatMap((validator) => {
      const address = validator.stashAccount

      if (!validatorsWithDetailsCache.has(address)) {
        const validator$ = getValidatorInfo(validator, activeValidators$, validatorsRewards$, api)
        validatorsWithDetailsCache.set(address, validator$)
      }

      return validatorsWithDetailsCache.get(address) as Observable<ValidatorWithDetails>
    })

    return combineLatest(validatorsWithDetails$)
  }, [api?.isConnected, validatorsWithMembership, validatorsRewards$, activeValidators$])

  const value = {
    setShouldFetchValidators,
    setValidatorDetailsOptions,
    validators: allValidatorsWithCtrlAcc,
    validatorsWithDetails,
  }

  return <ValidatorsContext.Provider value={value}>{props.children}</ValidatorsContext.Provider>
}

const validatorsWithDetailsCache = new Map<string, Observable<ValidatorWithDetails>>()

const freezeObservable: <T extends any>(o: Observable<T>) => Observable<T> = share({
  connector: () => new ReplaySubject(1),
  resetOnComplete: false,
  resetOnError: false,
  resetOnRefCountZero: false,
})
