import BN from 'bn.js'
import { useRef } from 'react'
import { combineLatest, filter, first, map, of, startWith, switchMap, catchError, Observable } from 'rxjs'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO, ERAS_PER_DAY } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'
import { formatTokenValue } from '@/common/model/formatters'

import { useMyStashPositions } from './useMyStashPositions'

export type ChartTimeRange = 'day' | 'week' | 'month'

export interface StakingChartData {
  labels: string[]
  rewardData: number[]
  stakeData: number[]
  barData: number[]
}

const generatePlaceholderLabels = (timeRange: ChartTimeRange): string[] => {
  if (timeRange === 'day') {
    return ['0h', '6h', '12h', '18h']
  } else if (timeRange === 'week') {
    return Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`)
  } else {
    return Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`)
  }
}

const createEmptyChartData = (timeRange: ChartTimeRange): StakingChartData => {
  const labels = generatePlaceholderLabels(timeRange)
  return {
    labels,
    rewardData: new Array(labels.length).fill(0),
    stakeData: new Array(labels.length).fill(0),
    barData: new Array(labels.length).fill(0),
  }
}

export const useMyStakingChartData = (timeRange: ChartTimeRange = 'month'): StakingChartData => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const stashPositions = useMyStashPositions()
  const previousDataRef = useRef<StakingChartData | null>(null)
  const chartData = useObservable<StakingChartData>((): Observable<StakingChartData> => {
    const emptyData = createEmptyChartData(timeRange)
    if (!api || !allAccounts.length || !stashPositions || stashPositions.length === 0) {
      return of(previousDataRef.current || emptyData).pipe(startWith(previousDataRef.current || emptyData))
    }

    const addresses = allAccounts.map((account) => account.address)

    const isReady$ =
      'isReady' in api && typeof api.isReady === 'function'
        ? (api.isReady() as any).pipe(
            filter((ready: any) => Boolean(ready)),
            first()
          )
        : api.rpc.chain.getBlockHash(0).pipe(
            first(),
            map(() => true)
          )

    const erasToFetch = timeRange === 'day' ? 4 : timeRange === 'week' ? 28 : 120

    const activeEra$ = api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        return activeEra.unwrap().index.toNumber()
      }),
      catchError(() => of(undefined))
    )

    const dataObservable = isReady$.pipe(
      switchMap(() => activeEra$),
      switchMap((currentEra): Observable<StakingChartData> => {
        if (!currentEra || typeof currentEra !== 'number') {
          const fallback = previousDataRef.current || emptyData
          return of(fallback)
        }

        const currentTotalStake = stashPositions.reduce((sum, position) => {
          const unlockingTotal = position.unlocking.reduce((unlockSum, chunk) => unlockSum.add(chunk.value), BN_ZERO)
          const totalStake = position.activeStake.add(unlockingTotal)
          return sum.add(totalStake)
        }, BN_ZERO)

        const stashToNominations = new Map<string, string[]>()
        stashPositions.forEach((position) => {
          if (position.role === 'nominator' && position.nominations.length > 0) {
            stashToNominations.set(position.stash, position.nominations)
          }
        })

        const startEra = Math.max(0, currentEra - erasToFetch)
        const eras = Array.from({ length: Math.min(erasToFetch, currentEra) }, (_, i) => startEra + i)

        const erasRewards$ = api.derive.staking.erasRewards().pipe(catchError(() => of([])))
        const erasPoints$ = api.derive.staking.erasPoints().pipe(catchError(() => of([])))

        return combineLatest([erasRewards$, erasPoints$]).pipe(
          switchMap(([erasRewards, erasPoints]: [any[], any[]]) => {
            const rewardsByEra = new Map(erasRewards.map((reward: any) => [reward.era.toNumber(), reward]))
            const pointsByEra = new Map(erasPoints.map((points: any) => [points.era.toNumber(), points]))

            const eraStakes$ = of(
              eras.map((era) => ({
                era,
                totalStake: currentTotalStake,
              }))
            )

            const eraSlashes$ = combineLatest(
              eras.map((era) =>
                combineLatest([
                  combineLatest(
                    addresses.map((address) =>
                      api.query.staking.validatorSlashInEra(era, address).pipe(
                        catchError(() => of(null)),
                        map((slash: any) => ({
                          era,
                          slashed: !slash || slash.isNone ? BN_ZERO : slash.unwrap()[1].toBn(),
                        }))
                      )
                    )
                  ),
                  combineLatest(
                    addresses.map((address) =>
                      api.query.staking.nominatorSlashInEra(era, address).pipe(
                        catchError(() => of(null)),
                        map((slash: any) => ({
                          era,
                          slashed: !slash || slash.isNone ? BN_ZERO : slash.unwrap().toBn(),
                        }))
                      )
                    )
                  ),
                ]).pipe(
                  map(([validatorSlashes, nominatorSlashes]: [any[], any[]]) => {
                    const totalValidatorSlashed = validatorSlashes.reduce((sum, s) => sum.add(s.slashed), BN_ZERO)
                    const totalNominatorSlashed = nominatorSlashes.reduce((sum, s) => sum.add(s.slashed), BN_ZERO)
                    return {
                      era,
                      totalSlashed: totalValidatorSlashed.add(totalNominatorSlashed),
                    }
                  })
                )
              )
            ).pipe(catchError(() => of([])))

            const eraRewards$ = combineLatest(
              eras.map((era) => {
                const reward = rewardsByEra.get(era)
                const points = pointsByEra.get(era)
                let eraReward = BN_ZERO

                if (reward && points && reward.eraReward && !reward.eraReward.isZero()) {
                  const totalPoints = points.eraPoints.toNumber()
                  if (totalPoints > 0) {
                    addresses.forEach((address) => {
                      const validatorPoints = points.validators?.[address]
                      if (validatorPoints) {
                        const validatorPointsNum = validatorPoints.toNumber()
                        const share = reward.eraReward.muln(validatorPointsNum).divn(totalPoints)
                        eraReward = eraReward.add(share)
                      }
                    })

                    const nominatorRewardQueries: Observable<BN>[] = []
                    stashToNominations.forEach((nominations, stashAddress) => {
                      nominations.forEach((validatorAddress) => {
                        const validatorPoints = points.validators?.[validatorAddress]
                        if (!validatorPoints) return

                        const query$ = api.query.staking.erasStakers(era, validatorAddress).pipe(
                          first(),
                          map((exposure: any) => {
                            if (!exposure || exposure.isEmpty) return BN_ZERO
                            const nominatorExposure = exposure.others.find(
                              (other: any) => other.who.toString() === stashAddress
                            )
                            if (!nominatorExposure) return BN_ZERO

                            const nominatorStake = nominatorExposure.value.toBn()
                            if (nominatorStake.isZero()) return BN_ZERO

                            const validatorTotalStake = exposure.total.toBn()
                            if (validatorTotalStake.isZero()) return BN_ZERO

                            const validatorPointsNum = validatorPoints.toNumber()
                            const validatorReward = reward.eraReward.muln(validatorPointsNum).divn(totalPoints)
                            const nominatorShare = validatorReward.mul(nominatorStake).div(validatorTotalStake)
                            return nominatorShare
                          }),
                          catchError(() => of(BN_ZERO))
                        )
                        nominatorRewardQueries.push(query$)
                      })
                    })

                    if (nominatorRewardQueries.length > 0) {
                      return combineLatest(
                        nominatorRewardQueries.map((q) => q.pipe(catchError(() => of(BN_ZERO))))
                      ).pipe(
                        map((nominatorRewards: BN[]) => {
                          const totalNominatorReward = nominatorRewards.reduce(
                            (sum, reward) => sum.add(reward),
                            BN_ZERO
                          )
                          return eraReward.add(totalNominatorReward)
                        }),
                        catchError(() => of(eraReward))
                      )
                    }
                  }
                }

                return of(eraReward)
              })
            )

            return combineLatest([eraStakes$, eraSlashes$, eraRewards$]).pipe(
              map(([eraStakes, eraSlashes, eraRewards]: [any[], any[], BN[]]) => {
                const stakesByEra = new Map(eraStakes.map((stake: any) => [stake.era, stake.totalStake]))
                const slashesByEra = new Map(eraSlashes.map((slash: any) => [slash.era, slash.totalSlashed]))

                const groupedData = new Map<string, { rewards: number[]; stakes: number[]; slashes: number[] }>()

                eras.forEach((era, index) => {
                  let groupKey: string
                  if (timeRange === 'day') {
                    const hoursSinceStart = (era - startEra) * 6
                    groupKey = `${hoursSinceStart}h`
                  } else if (timeRange === 'week') {
                    const daysSinceStart = Math.floor((era - startEra) / ERAS_PER_DAY)
                    groupKey = `Day ${daysSinceStart + 1}`
                  } else {
                    const weeksSinceStart = Math.floor((era - startEra) / (ERAS_PER_DAY * 7))
                    groupKey = `Week ${weeksSinceStart + 1}`
                  }

                  const eraReward = eraRewards[index] || BN_ZERO
                  const rewardInJoy = Number(formatTokenValue(eraReward) || '0')
                  const stakeInJoy = Number(formatTokenValue(stakesByEra.get(era) || BN_ZERO) || '0')
                  const slashedInJoy = Number(formatTokenValue(slashesByEra.get(era) || BN_ZERO) || '0')

                  if (!groupedData.has(groupKey)) {
                    groupedData.set(groupKey, { rewards: [], stakes: [], slashes: [] })
                  }
                  const group = groupedData.get(groupKey)!
                  group.rewards.push(rewardInJoy)
                  group.stakes.push(stakeInJoy)
                  group.slashes.push(slashedInJoy)
                })

                const labels: string[] = []
                const rewardData: number[] = []
                const stakeData: number[] = []
                const barData: number[] = []

                const sortedGroups = Array.from(groupedData.entries()).sort(([a], [b]) => {
                  const numA = parseInt(a.replace(/\D/g, '')) || 0
                  const numB = parseInt(b.replace(/\D/g, '')) || 0
                  return numA - numB
                })

                sortedGroups.forEach(([label, data]) => {
                  labels.push(label)
                  rewardData.push(data.rewards.reduce((sum, val) => sum + val, 0))
                  barData.push(data.slashes.reduce((sum, val) => sum + val, 0))
                  const stakeValue = data.stakes.length > 0 ? data.stakes[0] : 0
                  stakeData.push(stakeValue)
                })

                if (labels.length === 0) {
                  return previousDataRef.current || emptyData
                }

                const chartDataResult: StakingChartData = {
                  labels,
                  rewardData,
                  stakeData,
                  barData,
                }

                previousDataRef.current = chartDataResult
                return chartDataResult
              }),
              catchError(() => {
                const fallback = previousDataRef.current || emptyData
                return of(fallback)
              })
            )
          }),
          catchError(() => {
            const fallback = previousDataRef.current || emptyData
            return of(fallback)
          })
        )
      }),
      catchError(() => {
        const fallback = previousDataRef.current || emptyData
        return of(fallback)
      })
    )

    return dataObservable.pipe(
      map((data: any): StakingChartData => {
        if (
          !data ||
          !data.labels ||
          !data.rewardData ||
          !data.stakeData ||
          !data.barData ||
          !Array.isArray(data.labels) ||
          !Array.isArray(data.rewardData) ||
          !Array.isArray(data.stakeData) ||
          !Array.isArray(data.barData)
        ) {
          return previousDataRef.current || createEmptyChartData(timeRange)
        }
        const chartData: StakingChartData = {
          labels: data.labels,
          rewardData: data.rewardData,
          stakeData: data.stakeData,
          barData: data.barData,
        }
        const hasValidData =
          chartData.labels.length > 0 &&
          (chartData.rewardData.some((val: number) => val > 0) || chartData.stakeData.some((val: number) => val > 0))
        if (hasValidData) {
          previousDataRef.current = chartData
        }
        return chartData
      }),
      startWith(previousDataRef.current || emptyData)
    )
  }, [
    api,
    api?.isConnected,
    JSON.stringify(allAccounts.map((a) => a.address)),
    timeRange,
    stashPositions
      ? JSON.stringify(
          stashPositions.map((p) => ({
            stash: p.stash,
            activeStake: p.activeStake.toString(),
            unlocking: p.unlocking.map((u) => ({ era: u.era, value: u.value.toString() })),
          }))
        )
      : null,
  ])

  const hasValidData =
    chartData &&
    chartData.labels.length > 0 &&
    (chartData.rewardData.some((val: number) => val > 0) || chartData.stakeData.some((val: number) => val > 0))

  if (hasValidData) {
    return chartData
  }

  return previousDataRef.current || createEmptyChartData(timeRange)
}
