import { useMemo, useState } from 'react'
import { combineLatest, map, merge, Observable, of, scan } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'
import { filterObservableList, mapObservableList, sortObservableList } from '@/common/model/ObservableList'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

import { Validator, ValidatorDetailsFilter, ValidatorDetailsOrder, ValidatorInfo, ValidatorWithDetails } from '../types'

import { getValidatorSortingFns, getValidatorsFilters, getValidatorInfo, keepFirst } from './utils'

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
      keepFirst()
    )
  }, [api?.isConnected, !validatorDetailsOptions])

  const activeValidators$ = useMemo(() => {
    if (!validatorDetailsOptions) return

    return api?.query.session.validators().pipe(keepFirst())
  }, [api?.isConnected, !validatorDetailsOptions])

  const validatorsInfo$ = useMemo(() => {
    if (!api || !validatorsWithMembership || !validatorsRewards$ || !activeValidators$) return

    const validatorsInfo = validatorsWithMembership.map((validator) =>
      getValidatorInfo(validator, activeValidators$, validatorsRewards$, api)
    )

    return of(validatorsInfo)
  }, [api?.isConnected, validatorsWithMembership, validatorsRewards$, activeValidators$])

  const [filteredValidatorsInfo$, size$] = useMemo<[Observable<ValidatorInfo[]>, Observable<number>] | []>(() => {
    if (!validatorsInfo$ || !validatorDetailsOptions) return []

    const filtered$ = getValidatorsFilters(validatorDetailsOptions.filter).reduce(
      (validators$, predicate) => (predicate ? validators$.pipe(filterObservableList(predicate)) : validators$),
      validatorsInfo$
    )

    const size$ = filtered$.pipe(map((filtered) => filtered.length))

    return [filtered$, size$]
  }, [validatorsInfo$, validatorDetailsOptions?.filter])

  const validatorsWithDetails = useObservable<ValidatorWithDetails[]>(() => {
    if (!filteredValidatorsInfo$ || !validatorDetailsOptions) return

    const { order, start, end } = validatorDetailsOptions
    const sortDirection = order.isDescending ? -1 : 1
    const [sortMapFn, sortCompareFn] = getValidatorSortingFns(order.key)

    return filteredValidatorsInfo$.pipe(
      sortObservableList(sortMapFn, (a, b) => sortCompareFn(a, b) * sortDirection),
      map((validators) => validators.slice(start, end)),
      mapObservableList<ValidatorInfo, ValidatorWithDetails>(({ validator, ...rest }) =>
        merge(of(validator), ...Object.values(rest)).pipe(
          scan((validator: ValidatorWithDetails, part) => ({ ...validator, ...part }), validator)
        )
      )
    )
  }, [filteredValidatorsInfo$, validatorDetailsOptions])

  return {
    validatorsWithDetails,
    size: useObservable(() => size$, [size$]),
    setValidatorDetailsOptions,
  }
}
