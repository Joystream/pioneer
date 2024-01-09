import BN from 'bn.js'
import React, { ReactNode, useMemo, useState } from 'react'
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  Observable,
  scan,
  share,
  switchMap,
  take,
} from 'rxjs'

import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO, ERAS_PER_YEAR } from '@/common/constants'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservableArray } from '@/common/hooks/useObservableArray'
import { Address } from '@/common/types'
import { perbillToPercent } from '@/common/utils'
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
    if (!shouldFetchValidators) return

    return api?.query.staking.validators.entries().pipe(
      map((entries) =>
        entries.map((entry) => ({
          address: entry[0].args[0].toString(),
          commission: perbillToPercent(entry[1].commission.toBn()),
        }))
      )
    )
  }, [api?.isConnected, shouldFetchValidators])

  const allValidatorsWithCtrlAcc = useFirstObservableValue(() => {
    if (!allValidators) return

    return api?.query.staking.bonded
      .multi(allValidators.map(({ address }) => address))
      .pipe(map((entries) => entries.map((entry) => (entry.isSome ? entry.unwrap().toString() : undefined))))
  }, [allValidators, api?.isConnected])

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
    if (!allValidators || !allValidatorsWithCtrlAcc || !memberships) return

    return allValidators.map(({ address, commission }, index) => {
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
  }, [data, allValidators, allValidatorsWithCtrlAcc])

  const validatorsRewards$ = useMemo(() => {
    if (!api || !shouldFetchExtraDetails) return

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
      take(1),
      share({ connector: () => new AsyncSubject(), resetOnComplete: false })
    )
  }, [api?.isConnected, shouldFetchExtraDetails])

  const activeValidators$ = useMemo(() => {
    if (!shouldFetchExtraDetails) return

    return api?.query.session
      .validators()
      .pipe(take(1), share({ connector: () => new AsyncSubject(), resetOnComplete: false }))
  }, [api?.isConnected, shouldFetchExtraDetails])

  const validatorsWithDetails = useObservableArray<ValidatorMembership, ValidatorWithDetails>(
    validatorsWithMembership,
    (validator) => {
      if (!api || !validatorsRewards$) return

      return activeValidators$?.pipe(
        switchMap((activeValidators) => {
          const isActive = activeValidators.includes(validator.stashAccount)
          return getValidatorInfo({ ...validator, isActive }, validatorsRewards$, api)
        })
      )
    },
    { key: 'stashAccount', skip: !api || !validatorsRewards$ || !activeValidators$ }
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

type RewardsObservable = Observable<
  {
    era: number
    totalPoints: number
    individual: Record<string, number>
    totalPayout: BN
  }[]
>

const getValidatorInfo = (
  validator: ValidatorWithDetails,
  validatorsRewards$: RewardsObservable,
  api: Api
): Observable<ValidatorWithDetails> => {
  const address = validator.stashAccount

  const stakes$ = api.query.staking.activeEra().pipe(
    take(1),
    switchMap((activeEra) => api.query.staking.erasStakers(activeEra.unwrap().index, address)), // TODO handle potential unwrap failure
    map((stakingInfo) => {
      const total = stakingInfo.total.toBn()
      const nominators = stakingInfo.others.map((nominator) => ({
        address: nominator.who.toString(),
        staking: nominator.value.toBn(),
      }))

      return { staking: { total, own: stakingInfo.own.toBn(), others: nominators } }
    })
  )

  const rewards$ = validatorsRewards$.pipe(
    map((allRewards) => {
      const rewards = allRewards.flatMap(({ era, totalPoints, individual, totalPayout }) => {
        if (!individual[address]) return []
        const eraPoints = Number(individual[address])
        const eraReward = totalPayout.muln(eraPoints / totalPoints)
        return { era, eraReward, eraPoints }
      })

      return {
        rewardPointsHistory: rewards.map(({ era, eraPoints }) => ({ era, rewardPoints: eraPoints })),
        totalRewards: rewards.reduce((total, { eraReward }) => total.add(eraReward ?? BN_ZERO), BN_ZERO),
        latestReward: rewards[0]?.eraReward,
      }
    })
  )

  const slashing$ = api.query.staking.slashingSpans(address).pipe(
    take(1),
    map((slashingSpans) => {
      if (!slashingSpans.isSome) return { slashed: 0 }
      const { prior, lastNonzeroSlash } = slashingSpans.unwrap()
      return { slashed: prior.length + (lastNonzeroSlash.gtn(0) ? 1 : 0) }
    })
  )

  return merge(new BehaviorSubject({}), stakes$, rewards$, slashing$).pipe(
    scan((validator: ValidatorWithDetails, part) => ({ ...part, ...validator }), validator),
    map((validator) => {
      const { commission, staking } = validator
      if (!('latestReward' in validator) || !staking || staking.total.isZero()) return validator

      const apr = Number(validator.latestReward.muln(ERAS_PER_YEAR).muln(commission).div(staking.total))
      return { ...validator, APR: apr }
    })
  )
}
