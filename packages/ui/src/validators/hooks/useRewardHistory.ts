import BN from 'bn.js'
import { combineLatest, map, of, switchMap } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export interface RewardPayoutEvent {
  era: number
  validatorStash: string
  amount: BN
  blockNumber?: number
  timestamp?: number
}

/**
 * Hook to get reward payout history for a specific account
 * Returns the last 10 eras where rewards were received
 */
export const useRewardHistory = (address: string): RewardPayoutEvent[] | undefined => {
  const { api } = useApi()

  return useObservable(() => {
    if (!api || !address) return of(undefined)

    // Get current era
    const activeEra$ = api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        return activeEra.unwrap().index.toNumber()
      })
    )

    return activeEra$.pipe(
      switchMap((currentEra) => {
        if (!currentEra) return of([])

        // Get ledger to find claimed rewards
        return api.query.staking.bonded(address).pipe(
          switchMap((bonded) => {
            if (bonded.isNone) return of([])

            const controller = bonded.unwrap().toString()
            return api.query.staking.ledger(controller).pipe(
              switchMap((ledger) => {
                if (ledger.isNone) return of([])

                const ledgerData = ledger.unwrap()
                const claimedRewards = ledgerData.claimedRewards.map((era) => era.toNumber())

                // Get the last 10 claimed eras
                const recentClaimedEras = claimedRewards.slice(-10).sort((a, b) => b - a)

                if (recentClaimedEras.length === 0) return of([])

                // Use derive.staking for reward info
                const erasRewards$ = api.derive.staking.erasRewards()
                const erasPoints$ = api.derive.staking.erasPoints()

                return combineLatest([erasRewards$, erasPoints$]).pipe(
                  map(([erasRewards, erasPoints]) => {
                    const rewardsByEra = new Map(erasRewards.map((reward) => [reward.era.toNumber(), reward]))
                    const pointsByEra = new Map(erasPoints.map((points) => [points.era.toNumber(), points]))

                    const rewards: RewardPayoutEvent[] = []

                    recentClaimedEras.forEach((era) => {
                      const reward = rewardsByEra.get(era)
                      const points = pointsByEra.get(era)

                      if (!reward || !points || reward.eraReward.isZero()) return

                      const totalPoints = points.eraPoints.toNumber()
                      if (totalPoints === 0) return

                      // Check if this address was a validator in this era
                      const validatorPoints = points.validators[address]
                      if (validatorPoints) {
                        const validatorPointsNum = validatorPoints.toNumber()
                        const validatorReward = reward.eraReward.muln(validatorPointsNum).divn(totalPoints)

                        rewards.push({
                          era,
                          validatorStash: address,
                          amount: validatorReward,
                        })
                      } else {
                        // Check if nominator - would need to check each validator they nominated
                        // For now, we'll skip nominator rewards in history (too complex)
                      }
                    })

                    return rewards
                  })
                )
              })
            )
          })
        )
      })
    )
  }, [api?.isConnected, address])
}

/**
 * Hook to get all reward history for all user accounts
 */
export const useAllAccountsRewardHistory = (addresses: string[]): RewardPayoutEvent[] | undefined => {
  const { api } = useApi()

  return useObservable(() => {
    if (!api || !addresses.length) return of(undefined)

    // Get reward history for all accounts
    const allHistories$ = combineLatest(
      addresses.map((address) => {
        return api.query.staking.bonded(address).pipe(
          switchMap((bonded) => {
            if (bonded.isNone) return of([])

            const controller = bonded.unwrap().toString()
            return api.query.staking.ledger(controller).pipe(
              map((ledger) => {
                if (ledger.isNone) return []
                return {
                  address,
                  claimedRewards: ledger.unwrap().claimedRewards.map((era) => era.toNumber()),
                }
              })
            )
          })
        )
      })
    )

    return allHistories$.pipe(
      switchMap((accountsData) => {
        // Collect all unique claimed eras across all accounts
        const allClaimedEras = new Set<number>()
        accountsData.forEach((data) => {
          if (Array.isArray(data)) return
          data.claimedRewards.forEach((era) => allClaimedEras.add(era))
        })

        if (allClaimedEras.size === 0) return of([])

        // Sort and take last 20 eras
        const recentEras = Array.from(allClaimedEras)
          .sort((a, b) => b - a)
          .slice(0, 20)

        // Get reward info for these eras
        const erasRewards$ = api.derive.staking.erasRewards()
        const erasPoints$ = api.derive.staking.erasPoints()

        return combineLatest([erasRewards$, erasPoints$]).pipe(
          map(([erasRewards, erasPoints]) => {
            const rewardsByEra = new Map(erasRewards.map((reward) => [reward.era.toNumber(), reward]))
            const pointsByEra = new Map(erasPoints.map((points) => [points.era.toNumber(), points]))

            const allRewards: RewardPayoutEvent[] = []

            recentEras.forEach((era) => {
              accountsData.forEach((data) => {
                if (Array.isArray(data) || !data.claimedRewards.includes(era)) return

                const address = data.address
                const reward = rewardsByEra.get(era)
                const points = pointsByEra.get(era)

                if (!reward || !points || reward.eraReward.isZero()) return

                const totalPoints = points.eraPoints.toNumber()
                if (totalPoints === 0) return

                const validatorPoints = points.validators[address]
                if (validatorPoints) {
                  const validatorPointsNum = validatorPoints.toNumber()
                  const validatorReward = reward.eraReward.muln(validatorPointsNum).divn(totalPoints)

                  allRewards.push({
                    era,
                    validatorStash: address,
                    amount: validatorReward,
                  })
                }
              })
            })

            // Sort by era descending
            return allRewards.sort((a, b) => b.era - a.era)
          })
        )
      })
    )
  }, [api?.isConnected, JSON.stringify(addresses)])
}
