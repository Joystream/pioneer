import { useMemo, useState } from 'react'
import { combineLatest, map, Observable, of, ReplaySubject, share, switchMap, take } from 'rxjs'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'
import { isDefined } from '@/common/utils'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

import { Validator, ValidatorDetailsFilter, ValidatorDetailsOrder, ValidatorWithDetails } from '../types'

import { compareValidators, getValidatorsFilters, getValidatorInfo, filterValidatorsByIsActive } from './utils'

export type ValidatorDetailsOptions = {
  filter: ValidatorDetailsFilter
  order: ValidatorDetailsOrder
  start: number
  end: number
}

export const useValidatorsWithDetails = (allValidatorsWithCtrlAcc: Validator[] | undefined) => {
  const { api } = useApi()

  const [validatorDetailsOptions, setValidatorDetailsOptions] = useState<ValidatorDetailsOptions>()

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

  const validatorsWithMembership: ValidatorWithDetails[] | undefined = useMemo(() => {
    if (!memberships || !allValidatorsWithCtrlAcc || !validatorDetailsOptions) return

    return allValidatorsWithCtrlAcc.map((validator) => {
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
  }, [data, allValidatorsWithCtrlAcc, !validatorDetailsOptions])

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

  const activeValidators$ = useMemo(() => {
    if (!validatorDetailsOptions) return

    return api?.query.session.validators().pipe(
      take(1),
      map((activeAccs) => activeAccs.map(encodeAddress)),
      freezeObservable
    )
  }, [api?.isConnected, !validatorDetailsOptions])

  const validatorsWithDetails = useObservable(() => {
    if (!api || !validatorsWithMembership || !validatorsRewards$ || !activeValidators$ || !validatorDetailsOptions) {
      return
    }

    if (!validatorsWithMembership.length) return of([])

    const { filter, order, start, end } = validatorDetailsOptions

    const filterByState = switchMap(
      (validators: ValidatorWithDetails[]): Observable<ValidatorWithDetails[]> =>
        isDefined(filter.isActive)
          ? activeValidators$.pipe(filterValidatorsByIsActive(validators, filter.isActive))
          : of(validators)
    )

    const filterSortPaginate = map((validators: ValidatorWithDetails[]): ValidatorWithDetails[] =>
      getValidatorsFilters(filter)
        .reduce(
          (validators: ValidatorWithDetails[], predicate): ValidatorWithDetails[] =>
            predicate ? validators.filter(predicate) : validators,
          validators
        )
        .sort((a, b) => {
          const direction = order.isDescending ? -1 : 1
          return direction * compareValidators(a, b, order.key)
        })
        .slice(start, end)
    )

    const getInfo = switchMap(
      (validators: ValidatorWithDetails[]): Observable<ValidatorWithDetails[]> =>
        combineLatest(
          validators.flatMap((validator) => {
            const address = validator.stashAccount

            if (!validatorsWithDetailsCache.has(address)) {
              const validator$ = getValidatorInfo(validator, activeValidators$, validatorsRewards$, api)
              validatorsWithDetailsCache.set(address, validator$)
            }

            return validatorsWithDetailsCache.get(address) as Observable<ValidatorWithDetails>
          })
        )
    )

    return of(validatorsWithMembership).pipe(filterByState, filterSortPaginate, getInfo)
  }, [api?.isConnected, validatorsWithMembership, validatorsRewards$, activeValidators$, validatorDetailsOptions])

  return { validatorsWithDetails, setValidatorDetailsOptions }
}

const validatorsWithDetailsCache = new Map<string, Observable<ValidatorWithDetails>>()

const freezeObservable: <T>(o: Observable<T>) => Observable<T> = share({
  connector: () => new ReplaySubject(1),
  resetOnComplete: false,
  resetOnError: false,
  resetOnRefCountZero: false,
})
