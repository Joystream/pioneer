import { map, Observable, of, OperatorFunction, ReplaySubject, share, switchMap } from 'rxjs'

import { Api } from '@/api'
import { BN_ZERO, ERAS_PER_YEAR } from '@/common/constants'
import { isDefined } from '@/common/utils'

import { ValidatorDetailsFilter, ValidatorDetailsOrder, ValidatorInfo, ValidatorWithDetails } from '../types'

import { CommonValidatorsQueries } from './useValidatorsQueries'

export const getValidatorsFilters = ({
  isActive,
  isVerified,
  search = '',
}: ValidatorDetailsFilter): (false | ((i: ValidatorInfo) => Observable<unknown>))[] => {
  const s = search.toLowerCase()
  const isMatch = (value: string | undefined) => value && value.toLowerCase().search(s) >= 0

  return [
    // Status filter
    isDefined(isActive) && (({ isActive$ }) => isActive$.pipe(map((validator) => validator.isActive === isActive))),

    // Verification filter
    isDefined(isVerified) && (({ validator }: ValidatorInfo) => of(!!validator.isVerifiedValidator === isVerified)),

    // Search filter
    s.length > 2 &&
      (({ validator: { membership, stashAccount, controllerAccount } }: ValidatorInfo) =>
        of(isMatch(membership?.handle) || isMatch(stashAccount) || isMatch(controllerAccount))),
  ]
}

export const getValidatorSortingFns = (
  key: ValidatorDetailsOrder['key']
): [
  (item: ValidatorInfo) => Observable<ValidatorWithDetails>,
  (a: ValidatorWithDetails, b: ValidatorWithDetails) => number
] => {
  switch (key) {
    case 'default':
      return [
        (item) => of(item.validator),
        (a, b) => {
          if (!a.isVerifiedValidator !== !b.isVerifiedValidator) {
            return a.isVerifiedValidator ? -1 : 1
          }

          const handleA = a.membership?.handle
          const handleB = b.membership?.handle
          if ((handleA || handleB) && handleA !== handleB) {
            return !handleA ? 1 : !handleB ? -1 : handleA.localeCompare(handleB)
          }

          return a.stashAccount.localeCompare(b.stashAccount)
        },
      ]

    case 'commission':
      return [(item) => of(item.validator), (a, b) => a.commission - b.commission]

    case 'apr':
      return [
        (item) => item.apr$.pipe(map(({ APR }) => ({ ...item.validator, APR }))),
        (a, b) => (a.APR ?? -1) - (b.APR ?? -1),
      ]
  }
}

export const getValidatorInfo = (
  validator: ValidatorWithDetails,
  { activeValidators$, stakers$, validatorsRewards$ }: CommonValidatorsQueries,
  api: Api
): ValidatorInfo => {
  const address = validator.stashAccount

  const isActive$ = activeValidators$.pipe(
    map((activeValidators) => ({ isActive: activeValidators.includes(address) })),
    keepFirst()
  )

  const rewardHistory$ = validatorsRewards$.pipe(
    map((allRewards) =>
      allRewards.flatMap(({ era, totalPoints, individual, totalReward }) => {
        if (!individual[address]) return []
        const eraPoints = Number(individual[address])
        const eraReward = totalReward.muln(eraPoints / totalPoints)
        return { era, eraReward, eraPoints }
      })
    )
  )

  const reward$ = rewardHistory$.pipe(
    map((rewards) => ({
      rewardPointsHistory: rewards.map(({ era, eraPoints }) => ({ era, rewardPoints: eraPoints })),
      totalRewards: rewards.reduce((total, { eraReward }) => total.add(eraReward ?? BN_ZERO), BN_ZERO),
    })),
    keepFirst()
  )

  const staking$ = stakers$.pipe(
    switchMap((stakers) => stakers.get(address.toString()) ?? of(undefined)),
    map((stakingInfo) => {
      if (!stakingInfo) return { staking: { total: BN_ZERO, own: BN_ZERO, nominators: [] } }

      const total = stakingInfo.total.toBn()
      const nominators = stakingInfo.others.map((nominator) => ({
        address: nominator.who.toString(),
        staking: nominator.value.toBn(),
      }))

      return { staking: { total, own: stakingInfo.own.toBn(), nominators } }
    }),
    keepFirst()
  )

  const apr$ = staking$.pipe(
    switchMap(({ staking }) => {
      if (staking.total.isZero()) return of({})

      return rewardHistory$.pipe(
        map((rewards) => {
          if (!rewards.length) return {}

          const commission = validator.commission
          const averageReward = rewards.reduce((sum, reward) => sum.add(reward.eraReward), BN_ZERO).divn(rewards.length)
          const apr =
            Number(
              averageReward
                .muln(ERAS_PER_YEAR)
                .muln(100 - commission)
                .muln(100)
                .div(staking.total)
            ) / 100
          return { APR: apr }
        })
      )
    }),
    keepFirst()
  )

  const slashed$ = api.query.staking.slashingSpans(address).pipe(
    map((slashingSpans) => {
      if (!slashingSpans.isSome) return { slashed: 0 }
      const { prior, lastNonzeroSlash } = slashingSpans.unwrap()
      return { slashed: prior.length + (lastNonzeroSlash.gtn(0) ? 1 : 0) }
    }),
    keepFirst()
  )

  return { validator, isActive$, reward$, apr$, staking$, slashed$ }
}

export const keepFirst = <T>(): OperatorFunction<T, T> =>
  share({
    connector: () => new ReplaySubject(1),
    resetOnComplete: false,
    resetOnError: false,
    resetOnRefCountZero: false,
  })
