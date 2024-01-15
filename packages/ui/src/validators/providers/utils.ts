import BN from 'bn.js'
import { map, merge, Observable, of, ReplaySubject, scan, share, switchMap, take } from 'rxjs'

import { Api } from '@/api'
import { BN_ZERO, ERAS_PER_YEAR } from '@/common/constants'
import { isDefined } from '@/common/utils'

import { ValidatorDetailsFilter, ValidatorDetailsOrder, ValidatorWithDetails } from '../types'

export const getValidatorsFilters = ({ isVerified, search = '' }: ValidatorDetailsFilter) => {
  const s = search.toLowerCase()
  const isMatch = (value: string | undefined) => value && value.toLowerCase().search(s) >= 0

  return [
    // Verification filter
    isDefined(isVerified) && ((v: ValidatorWithDetails) => !!v.isVerifiedValidator === isVerified),

    // Search filter
    s.length > 2 &&
      (({ membership, stashAccount, controllerAccount }: ValidatorWithDetails) =>
        isMatch(membership?.handle) || isMatch(stashAccount) || isMatch(controllerAccount)),
  ]
}

export const filterValidatorsByIsActive = (validators: ValidatorWithDetails[], isActive: boolean) =>
  map((activeValidators: string[]) =>
    validators.filter(({ stashAccount }) => activeValidators.includes(stashAccount) === isActive)
  )

export const compareValidators = (
  a: ValidatorWithDetails,
  b: ValidatorWithDetails,
  key: ValidatorDetailsOrder['key']
) => {
  switch (key) {
    case 'default': {
      if (!a.isVerifiedValidator !== !b.isVerifiedValidator) {
        return a.isVerifiedValidator ? -1 : 1
      }

      const handleA = a.membership?.handle
      const handleB = b.membership?.handle
      if ((handleA || handleB) && handleA !== handleB) {
        return !handleA ? 1 : !handleB ? -1 : handleA.localeCompare(handleB)
      }

      return a.stashAccount.localeCompare(b.stashAccount)
    }

    case 'commission':
      return a.commission - b.commission
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
  activeValidators$: Observable<string[]>,
  validatorsRewards$: Observable<EraRewards[]>,
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

      return { staking: { total, own: stakingInfo.own.toBn(), nominators } }
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

  return merge(of({}), status$, rewards$, stakes$, slashing$).pipe(
    scan((validator: ValidatorWithDetails, part) => ({ ...part, ...validator }), validator),
    map((validator) => {
      const { commission, staking } = validator
      if (!('latestReward' in validator) || !staking || staking.total.isZero()) return validator

      const latestReward = validator.latestReward
      const apr = latestReward && Number(latestReward.muln(ERAS_PER_YEAR).muln(commission).div(staking.total))
      return { ...validator, APR: apr }
    }),
    share({
      connector: () => new ReplaySubject(1),
      resetOnError: false,
      resetOnComplete: false,
      resetOnRefCountZero: false,
    })
  )
}
