import { Vec } from '@polkadot/types'
import { AccountId } from '@polkadot/types/interfaces'
import BN from 'bn.js'
import { useMemo } from 'react'
import { Observable, combineLatest, map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'

import { keepFirst } from './utils'

type ActiveValidators = Vec<AccountId>

type EraRewards = {
  era: number
  totalPoints: number
  individual: Record<string, number>
  totalReward: BN
}

export type CommonValidatorsQueries = {
  activeValidators$: Observable<ActiveValidators>
  validatorsRewards$: Observable<EraRewards[]>
}

export const useValidatorsQueries = (): CommonValidatorsQueries | undefined => {
  const { api } = useApi()

  return useMemo<CommonValidatorsQueries | undefined>(() => {
    if (!api) return

    const activeValidators$ = api.query.session.validators().pipe(keepFirst())

    const erasRewards$ = api.derive.staking.erasRewards().pipe(keepFirst())
    const eraRewardPoints$ = api.derive.staking.erasPoints().pipe(keepFirst())

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
      )
    )

    return { activeValidators$, validatorsRewards$ }
  }, [api?.isConnected])
}
