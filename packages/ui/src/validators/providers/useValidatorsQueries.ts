import { PalletStakingExposure } from '@polkadot/types/lookup'
import BN from 'bn.js'
import { useMemo } from 'react'
import { Observable, combineLatest, map, switchMap } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'

import { keepFirst } from './utils'

type ActiveEra = { index: number; startedOn: number }

type ActiveValidators = string[]

type Stakers = Map<string, Observable<PalletStakingExposure>>

type EraRewards = {
  era: number
  totalPoints: number
  individual: Record<string, number>
  totalReward: BN
}

export type CommonValidatorsQueries = {
  activeEra$: Observable<ActiveEra>
  activeValidators$: Observable<ActiveValidators>
  stakers$: Observable<Stakers>
  validatorsRewards$: Observable<EraRewards[]>
}

export const useValidatorsQueries = (): CommonValidatorsQueries | undefined => {
  const { api } = useApi()

  return useMemo<CommonValidatorsQueries | undefined>(() => {
    if (!api) return

    const activeValidators$ = api.query.session.validators().pipe(
      map((activeAccounts) => activeAccounts.map((account) => account.toString())),
      keepFirst()
    )

    const activeEra$ = api.query.staking.activeEra().pipe(
      map((activeEra) => ({
        index: activeEra.unwrap().index.toNumber(),
        startedOn: activeEra.unwrap().start.unwrap().toNumber(),
      })),
      keepFirst()
    )

    const stakers$ = activeValidators$.pipe(
      map(
        (activeValidators) =>
          new Map(
            activeValidators.map((account) => {
              const staker$ = activeEra$.pipe(switchMap(({ index }) => api.query.staking.erasStakers(index, account)))
              return [account.toString(), staker$]
            })
          )
      ),
      keepFirst()
    )

    const erasRewards$ = api.derive.staking.erasRewards()
    const eraRewardPoints$ = api.derive.staking.erasPoints()

    const validatorsRewards$ = combineLatest([erasRewards$, eraRewardPoints$]).pipe(
      map(([erasRewards, eraRewardPoints]) =>
        eraRewardPoints.map<EraRewards>((points, index) => {
          const era = points.era.toNumber()
          const reward = erasRewards[index]

          if (era !== reward?.era.toNumber()) {
            throw Error(
              `derive.staking.erasRewards and derive.staking.erasPoints eras didn't match. Era #${era} is missing`
            )
          }

          return {
            era,
            totalPoints: points.eraPoints.toNumber(),
            totalReward: reward.eraReward,
            individual: Object.fromEntries(
              Object.entries(points.validators).map(([address, points]) => [address, points.toNumber()])
            ),
          }
        })
      ),
      keepFirst()
    )

    return { activeEra$, activeValidators$, stakers$, validatorsRewards$ }
  }, [api?.isConnected])
}
