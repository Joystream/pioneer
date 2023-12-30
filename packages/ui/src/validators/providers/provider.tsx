import { BN } from '@polkadot/util'
import React, { ReactNode, useMemo, useState } from 'react'
import { of, map, switchMap, Observable, combineLatest } from 'rxjs'

import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { ERAS_PER_YEAR } from '@/common/constants'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { Address } from '@/common/types'
import { perbillToPercent, last } from '@/common/utils'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

import { ValidatorMembership, ValidatorWithDetails } from '../types'

import { ValidatorsContext } from './context'

interface Props {
  children: ReactNode
}

export interface UseValidators {
  setShouldFetchValidators: (shouldFetchValidators: boolean) => void
  setShouldFetchExtraDetails: (shouldFetchExtraDetails: boolean) => void
  allValidators?: {
    address: Address
    commission: number
  }[]
  allValidatorsWithCtrlAcc?: (string | undefined)[]
  validatorsWithMembership?: ValidatorMembership[]
  validatorsWithDetails?: ValidatorWithDetails[]
}

export const ValidatorContextProvider = (props: Props) => {
  const { api } = useApi()

  const [shouldFetchValidators, setShouldFetchValidators] = useState(false)
  const [shouldFetchExtraDetails, setShouldFetchExtraDetails] = useState(false)

  const allValidators = useFirstObservableValue(() => {
    if (!shouldFetchValidators) return undefined
    return api?.query.staking.validators.entries().pipe(
      map((entries) =>
        entries.map((entry) => ({
          address: entry[0].args[0].toString(),
          commission: perbillToPercent(entry[1].commission.toBn()),
        }))
      )
    )
  }, [api?.isConnected, shouldFetchValidators])

  const allValidatorsWithCtrlAcc = useFirstObservableValue(
    () =>
      allValidators &&
      api &&
      api.query.staking.bonded
        .multi(allValidators.map(({ address }) => address))
        .pipe(map((entries) => entries.map((entry) => (entry.isSome ? entry.unwrap().toString() : undefined)))),
    [allValidators, api?.isConnected]
  )

  const variables = {
    where: {
      OR: [
        {
          rootAccount_in:
            (allValidatorsWithCtrlAcc
              ?.concat(allValidators?.map(({ address }) => address))
              .filter((element) => !!element) as string[]) ?? [],
        },
        {
          controllerAccount_in:
            (allValidatorsWithCtrlAcc
              ?.concat(allValidators?.map(({ address }) => address))
              .filter((element) => !!element) as string[]) ?? [],
        },
        {
          boundAccounts_containsAny:
            (allValidatorsWithCtrlAcc
              ?.concat(allValidators?.map(({ address }) => address))
              .filter((element) => !!element) as string[]) ?? [],
        },
      ],
    },
  }

  const { data } = useGetMembersWithDetailsQuery({ variables, skip: !allValidatorsWithCtrlAcc })

  const memberships = data?.memberships?.map((rawMembership) => ({
    membership: asMemberWithDetails(rawMembership),
    isVerifiedValidator: rawMembership.metadata.isVerifiedValidator ?? false,
  }))

  const validatorsWithMembership: ValidatorMembership[] | undefined = useMemo(() => {
    return (
      allValidators &&
      allValidatorsWithCtrlAcc &&
      memberships &&
      allValidators.map(({ address, commission }, index) => {
        const controllerAccount = allValidatorsWithCtrlAcc[index]
        return {
          stashAccount: address,
          controllerAccount,
          commission,
          ...memberships.find(
            ({ membership }) =>
              membership.rootAccount === address ||
              membership.rootAccount === controllerAccount ||
              membership.controllerAccount === address ||
              membership.controllerAccount === controllerAccount ||
              membership.boundAccounts.includes(address) ||
              (controllerAccount && membership.boundAccounts.includes(controllerAccount))
          ),
        }
      })
    )
  }, [data, allValidators, allValidatorsWithCtrlAcc])

  const validatorRewardPointsHistory = useFirstObservableValue(() => {
    if (shouldFetchExtraDetails) return
    return api?.query.staking.erasRewardPoints.entries()
  }, [api?.isConnected, shouldFetchExtraDetails])

  const activeValidators = useFirstObservableValue(() => {
    if (shouldFetchExtraDetails) return
    return api?.query.session.validators()
  }, [api?.isConnected, shouldFetchExtraDetails])

  const getValidatorInfo = (validator: ValidatorMembership, api: Api): Observable<ValidatorWithDetails> => {
    if (!activeValidators || !validatorRewardPointsHistory) return of()
    const { stashAccount: address, commission } = validator
    const stakingInfo$ = api.query.staking
      .activeEra()
      .pipe(switchMap((activeEra) => api.query.staking.erasStakers(activeEra.unwrap().index, address)))
    const rewardHistory$ = api.derive.staking.stakerRewards(address)
    const slashingSpans$ = api.query.staking.slashingSpans(address)
    return combineLatest([stakingInfo$, rewardHistory$, slashingSpans$]).pipe(
      map(([stakingInfo, rewardHistory, slashingSpans]) => {
        const apr =
          rewardHistory.length && !stakingInfo.total.toBn().isZero()
            ? last(rewardHistory)
                .eraReward.toBn()
                .muln(ERAS_PER_YEAR)
                .muln(commission)
                .div(stakingInfo.total.toBn())
                .toNumber()
            : 0
        const rewardPointsHistory = validatorRewardPointsHistory.map((entry) => ({
          era: entry[0].args[0].toNumber(),
          rewardPoints: (entry[1].individual.toJSON()[address] ?? 0) as number,
        }))
        return {
          ...validator,
          isActive: activeValidators.includes(address),
          totalRewards: rewardHistory.reduce((total: BN, data) => total.add(data.eraReward), new BN(0)),
          rewardPointsHistory,
          APR: apr,
          slashed: slashingSpans.isSome
            ? slashingSpans.unwrap().prior.length + (slashingSpans.unwrap().lastNonzeroSlash.toNumber() > 0 ? 1 : 0)
            : 0,
          staking: {
            total: stakingInfo.total.toBn(),
            own: stakingInfo.own.toBn(),
            others: stakingInfo.others.map((nominator) => ({
              address: nominator.who.toString(),
              staking: nominator.value.toBn(),
            })),
          },
        }
      })
    )
  }

  const getValidatorsInfo = (api: Api, validators: ValidatorMembership[]) => {
    const validatorInfoObservables = validators.map((validator) => getValidatorInfo(validator, api))
    return combineLatest(validatorInfoObservables)
  }

  const validatorsWithDetails = useFirstObservableValue(
    () =>
      api && validatorsWithMembership && validatorRewardPointsHistory && activeValidators
        ? getValidatorsInfo(api, validatorsWithMembership)
        : of([]),
    [api?.isConnected, validatorsWithMembership, validatorRewardPointsHistory, activeValidators]
  )

  const value = {
    setShouldFetchValidators,
    setShouldFetchExtraDetails,
    allValidators,
    allValidatorsWithCtrlAcc,
    validatorsWithMembership,
    validatorsWithDetails,
  }

  return <ValidatorsContext.Provider value={value}>{props.children}</ValidatorsContext.Provider>
}
