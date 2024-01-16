import { Vec } from '@polkadot/types'
import { AccountId } from '@polkadot/types/interfaces'
import BN from 'bn.js'
import { combineLatest, map, Observable, of, OperatorFunction, pipe, ReplaySubject, share, switchMap, take } from 'rxjs'

import { Api } from '@/api'
import { BN_ZERO, ERAS_PER_YEAR } from '@/common/constants'
import { isDefined } from '@/common/utils'

import { ValidatorDetailsFilter, ValidatorDetailsOrder, ValidatorInfo, ValidatorWithDetails } from '../types'

export const getValidatorsFilters = ({ isVerified, search = '' }: ValidatorDetailsFilter) => {
  const s = search.toLowerCase()
  const isMatch = (value: string | undefined) => value && value.toLowerCase().search(s) >= 0

  return [
    // Verification filter
    isDefined(isVerified) && (({ validator }: ValidatorInfo) => of(!!validator.isVerifiedValidator === isVerified)),

    // Search filter
    s.length > 2 &&
      (({ validator: { membership, stashAccount, controllerAccount } }: ValidatorInfo) =>
        of(isMatch(membership?.handle) || isMatch(stashAccount) || isMatch(controllerAccount))),
  ]
}

export const filterValidatorsByIsActive = (validators: ValidatorWithDetails[], isActive: boolean) =>
  map((activeValidators: Vec<AccountId>) =>
    validators.filter(({ stashAccount }) => activeValidators.includes(stashAccount) === isActive)
  )

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
  }
}

type EraRewards = {
  era: number
  totalPoints: number
  individual: Record<string, number>
  totalPayout: BN
}

export const getValidatorInfo = (
  validator: ValidatorWithDetails,
  activeValidators$: Observable<Vec<AccountId>>,
  validatorsRewards$: Observable<EraRewards[]>,
  api: Api
): ValidatorInfo => {
  const address = validator.stashAccount

  const isActive$ = activeValidators$.pipe(
    map((activeValidators) => ({ isActive: activeValidators.includes(address) })),
    keepFirst()
  )

  const rewardHistory$ = validatorsRewards$.pipe(
    map((allRewards) =>
      allRewards.flatMap(({ era, totalPoints, individual, totalPayout }) => {
        if (!individual[address]) return []
        const eraPoints = Number(individual[address])
        const eraReward = totalPayout.muln(eraPoints / totalPoints)
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

  const staking$ = api.query.staking.activeEra().pipe(
    switchMap((activeEra) => api.query.staking.erasStakers(activeEra.unwrap().index, address)), // TODO handle potential unwrap failure
    map((stakingInfo) => {
      const total = stakingInfo.total.toBn()
      const nominators = stakingInfo.others.map((nominator) => ({
        address: nominator.who.toString(),
        staking: nominator.value.toBn(),
      }))

      return { staking: { total, own: stakingInfo.own.toBn(), nominators } }
    }),
    keepFirst()
  )

  const apr$ = combineLatest([rewardHistory$, staking$]).pipe(
    map(([rewards, { staking }]) => {
      const commission = validator.commission
      const latestReward = rewards.at(0)?.eraReward
      const apr = latestReward && Number(latestReward.muln(ERAS_PER_YEAR).muln(commission).div(staking.total))
      return { APR: apr }
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
  pipe(
    take(1),
    share({
      connector: () => new ReplaySubject(1),
      resetOnComplete: false,
      resetOnError: false,
      resetOnRefCountZero: false,
    })
  )
