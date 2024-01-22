import { useMemo, useState } from 'react'
import { map, merge, Observable, of, scan, switchMap, throttleTime } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { filterObservableList, mapObservableList, sortObservableList } from '@/common/model/ObservableList'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

import { Validator, ValidatorDetailsFilter, ValidatorDetailsOrder, ValidatorInfo, ValidatorWithDetails } from '../types'

import { CommonValidatorsQueries } from './useValidatorsQueries'
import { getValidatorSortingFns, getValidatorsFilters, getValidatorInfo } from './utils'

export type ValidatorDetailsOptions = {
  filter: ValidatorDetailsFilter
  order: ValidatorDetailsOrder
  start: number
  end: number
}

export const useValidatorsWithDetails = (
  allValidatorsWithCtrlAcc: Validator[] | undefined,
  validatorsQueries: CommonValidatorsQueries | undefined
) => {
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

  const validatorsInfo$ = useMemo(() => {
    if (!api || !validatorsWithMembership || !validatorsQueries) return

    const validatorsInfo = validatorsWithMembership.map((validator) =>
      getValidatorInfo(validator, validatorsQueries, api)
    )

    return of(validatorsInfo)
  }, [api?.isConnected, validatorsWithMembership, validatorsQueries])

  const [filteredValidatorsInfo$, size$] = useMemo<[Observable<ValidatorInfo[]>, Observable<number>] | []>(() => {
    if (!validatorsInfo$ || !validatorDetailsOptions) return []

    const filtered$ = getValidatorsFilters(validatorDetailsOptions.filter).reduce(
      (validators$, predicate) => (predicate ? validators$.pipe(filterObservableList(predicate)) : validators$),
      validatorsInfo$
    )

    const size$ = filtered$.pipe(map((filtered) => filtered.length))

    return [filtered$, size$]
  }, [validatorsInfo$, validatorDetailsOptions?.filter])

  const validatorsWithDetails = useObservable<ValidatorWithDetails[] | undefined>(() => {
    if (!filteredValidatorsInfo$ || !size$ || !validatorDetailsOptions) return

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
      ),
      throttleTime(10, undefined, { leading: false, trailing: true }),
      switchMap((validators) => size$.pipe(map((size) => (!validators[0] && size > 0 ? undefined : validators))))
    )
  }, [filteredValidatorsInfo$, size$, validatorDetailsOptions?.start, validatorDetailsOptions?.order])

  return {
    validatorsWithDetails,
    size: useObservable(() => size$, [size$]),
    setValidatorDetailsOptions,
  }
}
