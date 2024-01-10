import BN from 'bn.js'
import React, { ReactNode, useMemo, useState } from 'react'
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  Observable,
  of,
  scan,
  share,
  switchMap,
  take,
} from 'rxjs'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO, ERAS_PER_YEAR } from '@/common/constants'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'
import { isDefined, perbillToPercent } from '@/common/utils'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

import { Validator, ValidatorMembership, ValidatorWithDetails } from '../types'

import { ValidatorsContext } from './context'

interface Props {
  children: ReactNode
}

type ValidatorDetailsFilter = { search?: string; isVerified?: boolean; isActive?: boolean }

export interface UseValidators {
  setShouldFetchValidators: (shouldFetchValidators: boolean) => void
  setValidatorDetailsFilter: (validatorDetailsFilter?: ValidatorDetailsFilter) => void
  validators?: Validator[]
  validatorsWithDetails?: ValidatorWithDetails[]
}

export const ValidatorContextProvider = (props: Props) => {
  const { api } = useApi()

  const [shouldFetchValidators, setShouldFetchValidators] = useState(false)
  const [validatorDetailsFilter, setValidatorDetailsFilter] = useState<ValidatorDetailsFilter>()

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
    if (!validatorDetailsFilter) return

    return api?.query.session.validators().pipe(
      take(1),
      map((activeAccs) => activeAccs.map(encodeAddress)),
      freezeObservable
    )
  }, [api?.isConnected, !validatorDetailsFilter])

  const filteredValidators = useFirstObservableValue(() => {
    if (!allValidatorsWithCtrlAcc || !validatorDetailsFilter || !activeValidators$) return

    const getAddressesByIsActive = map((activeValidators: string[]) =>
      allValidatorsWithCtrlAcc.filter(
        ({ stashAccount }) => activeValidators.includes(stashAccount) === validatorDetailsFilter.isActive
      )
    )
    return isDefined(validatorDetailsFilter.isActive)
      ? activeValidators$.pipe(getAddressesByIsActive)
      : of(allValidatorsWithCtrlAcc)
  }, [allValidatorsWithCtrlAcc, validatorDetailsFilter, activeValidators$])

  const variables = useMemo(() => {
    if (!filteredValidators) return

    const addresses = filteredValidators.flatMap(({ stashAccount: stash, controllerAccount: ctrl }) =>
      ctrl ? [stash, ctrl] : [stash]
    )

    return {
      where: {
        OR: [
          { rootAccount_in: addresses },
          { controllerAccount_in: addresses },
          { boundAccounts_containsAny: addresses },
        ],
      },
    }
  }, [filteredValidators])

  const { data } = useGetMembersWithDetailsQuery({ variables, skip: !variables })

  const memberships = data?.memberships?.map((rawMembership) => ({
    membership: asMemberWithDetails(rawMembership),
    isVerifiedValidator: rawMembership.metadata.isVerifiedValidator ?? false,
  }))

  const validatorsWithMembership: ValidatorMembership[] | undefined = useMemo(() => {
    if (!memberships || !filteredValidators || !validatorDetailsFilter) return

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

    return getValidatorFilter(validatorDetailsFilter).reduce(
      (validators: ValidatorMembership[], filter): ValidatorMembership[] =>
        filter ? validators.filter(filter) : validators,
      validators
    )
  }, [data, filteredValidators, validatorDetailsFilter])

  const validatorsRewards$ = useMemo(() => {
    if (!api || !validatorDetailsFilter) return

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
  }, [api?.isConnected, !validatorDetailsFilter])

  const validatorsWithDetails = useObservable(() => {
    if (!api || !validatorsWithMembership || !activeValidators$ || !validatorsRewards$) return

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
    setValidatorDetailsFilter,
    validators: allValidatorsWithCtrlAcc,
    validatorsWithDetails,
  }

  return <ValidatorsContext.Provider value={value}>{props.children}</ValidatorsContext.Provider>
}

const validatorsWithDetailsCache = new Map<string, Observable<ValidatorWithDetails>>()

const freezeObservable = <T extends any>(o: Observable<T>): Observable<T> =>
  o.pipe(
    share({
      connector: () => new AsyncSubject(),
      resetOnComplete: false,
      resetOnError: false,
      resetOnRefCountZero: false,
    })
  )

const getValidatorFilter = ({ isVerified, search = '' }: ValidatorDetailsFilter) => {
  const s = search.toLowerCase()

  return [
    // Verification filter
    isDefined(isVerified) && ((v: ValidatorMembership) => !!v.isVerifiedValidator === isVerified),

    // Search filter
    s.length > 2 &&
      (({ membership, stashAccount, controllerAccount }: ValidatorMembership) =>
        (membership && membership.handle.toLowerCase().search(s) >= 0) ||
        stashAccount.search(s) >= 0 ||
        (controllerAccount && controllerAccount.search(s) >= 0)),
  ]
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
  activeValidators$: Observable<string[]>,
  validatorsRewards$: RewardsObservable,
  api: Api
): Observable<ValidatorWithDetails> => {
  const address = validator.stashAccount

  const status$ = activeValidators$.pipe(map((activeValidators) => ({ isActive: activeValidators.includes(address) })))

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

  const slashing$ = api.query.staking.slashingSpans(address).pipe(
    take(1),
    map((slashingSpans) => {
      if (!slashingSpans.isSome) return { slashed: 0 }
      const { prior, lastNonzeroSlash } = slashingSpans.unwrap()
      return { slashed: prior.length + (lastNonzeroSlash.gtn(0) ? 1 : 0) }
    })
  )

  return merge(status$, stakes$, rewards$, slashing$).pipe(
    scan((validator: ValidatorWithDetails, part) => ({ ...part, ...validator }), validator),
    map((validator) => {
      const { commission, staking } = validator
      if (!('latestReward' in validator) || !staking || staking.total.isZero()) return validator

      const latestReward = validator.latestReward as BN
      const apr = Number(latestReward.muln(ERAS_PER_YEAR).muln(commission).div(staking.total))
      return { ...validator, APR: apr }
    }),
    share({
      connector: () => new BehaviorSubject(validator),
      resetOnError: false,
      resetOnComplete: false,
      resetOnRefCountZero: false,
    })
  )
}
