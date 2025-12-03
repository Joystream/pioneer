import BN from 'bn.js'
import { combineLatest, first, map, of, switchMap, catchError, Observable } from 'rxjs'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO, ERA_DEPTH, ERA_PER_MONTH } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'

export interface MyStakingRewards {
  totalRewards: BN
  lastEraRewards: BN
  claimableRewards: BN
  monthlyRewards: BN
  unclaimedEras: number[]
  claimedEras: number[]
}

const STORAGE_KEY_PREFIX = 'staking_claimed_eras_'

// Get claimed eras from localStorage
const getCachedClaimedEras = (address: string): Set<number> => {
  try {
    const cached = localStorage.getItem(`${STORAGE_KEY_PREFIX}${address}`)
    if (cached) {
      const data = JSON.parse(cached)
      // Check if cache is still valid (within last 24 hours)
      if (data.timestamp && Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        return new Set(data.claimedEras || [])
      }
    }
  } catch (e) {
    // Ignore errors
  }
  return new Set<number>()
}

// Save claimed eras to localStorage
const saveCachedClaimedEras = (address: string, claimedEras: number[]) => {
  try {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${address}`,
      JSON.stringify({
        claimedEras,
        timestamp: Date.now(),
      })
    )
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Hook to calculate user's staking rewards including claimable amounts
 * Based on erasValidatorReward, erasRewardPoints, and claimed eras from ledger
 */
export const useMyStakingRewards = (): MyStakingRewards | undefined => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()

  return useObservable(() => {
    if (!api || !allAccounts.length) return of(undefined)

    const addresses = allAccounts.map((account) => account.address)

    // Get current era and use history depth constant
    const eraInfo$ = api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        const currentEra = activeEra.unwrap().index.toNumber()
        return { currentEra, historyDepth: ERA_DEPTH, oldestEra: Math.max(0, currentEra - ERA_DEPTH) }
      })
    )

    return eraInfo$.pipe(
      switchMap((eraInfo) => {
        if (!eraInfo) {
          return of({
            totalRewards: BN_ZERO,
            lastEraRewards: BN_ZERO,
            claimableRewards: BN_ZERO,
            monthlyRewards: BN_ZERO,
            unclaimedEras: [],
            claimedEras: [],
          })
        }

        const { currentEra, oldestEra } = eraInfo

        // Get ledger data and nominations for each account to find claimed eras
        const bonded$ = api.query.staking.bonded.multi(addresses)
        const nominators$ = api.query.staking.nominators.multi(addresses)

        const ledgersAndNominations$ = combineLatest([bonded$, nominators$]).pipe(
          switchMap(([bondedEntries, nominators]) => {
            // Get ledger data for each account
            const ledgers$ = combineLatest(
              addresses.map((address, index) => {
                const bonded = bondedEntries[index]
                if (bonded.isNone) return of(null)
                const controller = bonded.unwrap().toString()
                return api.query.staking.ledger(controller).pipe(
                  map((ledger) => {
                    if (ledger.isNone) return null
                    const ledgerData = ledger.unwrap()
                    const stash = ledgerData.stash.toString()
                    const claimedRewards = ledgerData.claimedRewards.map((era) => era.toNumber())
                    // Save to localStorage
                    saveCachedClaimedEras(stash, claimedRewards)
                    return {
                      stash,
                      claimedRewards,
                    }
                  })
                )
              })
            ).pipe(map((ledgers) => ledgers.filter((ledger): ledger is NonNullable<typeof ledger> => ledger !== null)))

            // Get nominations for each stash
            const stashToNominations = new Map<string, string[]>()
            addresses.forEach((address, index) => {
              const nominationsOpt = nominators[index]
              if (nominationsOpt && !nominationsOpt.isEmpty) {
                const nominations = nominationsOpt.unwrap().targets.map((target) => target.toString())
                if (nominations.length > 0) {
                  stashToNominations.set(address, nominations)
                }
              }
            })

            return ledgers$.pipe(map((ledgers) => ({ ledgers, stashToNominations })))
          })
        )

        // Use derive.staking.erasRewards to get reward information
        const erasRewards$ = api.derive.staking.erasRewards()
        const eraPoints$ = api.derive.staking.erasPoints()

        return combineLatest([ledgersAndNominations$, erasRewards$, eraPoints$]).pipe(
          switchMap(([{ ledgers, stashToNominations }, erasRewards, erasPoints]) => {
            if (!erasRewards.length || !erasPoints.length) {
              return of({
                totalRewards: BN_ZERO,
                lastEraRewards: BN_ZERO,
                claimableRewards: BN_ZERO,
                monthlyRewards: BN_ZERO,
                unclaimedEras: [],
                claimedEras: [],
              })
            }

            // Create a map of claimed eras per stash for quick lookup
            const claimedErasByStash = new Map<string, Set<number>>()
            const allClaimedEras: number[] = []

            // Load claimed eras from ledgers
            ledgers.forEach((ledger) => {
              const claimedSet = new Set<number>()
              ledger.claimedRewards.forEach((era) => {
                claimedSet.add(era)
                if (!allClaimedEras.includes(era)) {
                  allClaimedEras.push(era)
                }
              })
              claimedErasByStash.set(ledger.stash, claimedSet)
            })

            addresses.forEach((address) => {
              if (!claimedErasByStash.has(address)) {
                const cached = getCachedClaimedEras(address)
                if (cached.size > 0) {
                  claimedErasByStash.set(address, cached)
                  cached.forEach((era) => {
                    if (!allClaimedEras.includes(era)) {
                      allClaimedEras.push(era)
                    }
                  })
                } else {
                  claimedErasByStash.set(address, new Set<number>())
                }
              }
            })

            const pointsByEra = new Map(erasPoints.map((points) => [points.era.toNumber(), points]))

            // Process each era
            const eraRewardPromises = erasRewards.map((eraReward, index) => {
              const era = eraReward.era.toNumber()
              const reward = eraReward.eraReward
              const points = pointsByEra.get(era)

              if (!points || !reward || reward.isZero()) {
                return of({
                  totalRewards: BN_ZERO,
                  claimableRewards: BN_ZERO,
                  monthlyRewards: BN_ZERO,
                  lastEraRewards: BN_ZERO,
                  unclaimedEras: [] as number[],
                })
              }

              const totalPoints = points.eraPoints.toNumber()
              if (totalPoints === 0) {
                return of({
                  totalRewards: BN_ZERO,
                  claimableRewards: BN_ZERO,
                  monthlyRewards: BN_ZERO,
                  lastEraRewards: BN_ZERO,
                  unclaimedEras: [] as number[],
                })
              }

              // Calculate validator rewards
              const validatorRewardQueries: Observable<{ stash: string; reward: BN }>[] = []
              addresses.forEach((address) => {
                const validatorPoints = points.validators[address]
                if (!validatorPoints) return

                const validatorPointsNum = validatorPoints.toNumber()
                const validatorReward = reward.muln(validatorPointsNum).divn(totalPoints)
                validatorRewardQueries.push(of({ stash: address, reward: validatorReward }))
              })

              // Calculate nominator rewards - query exposures for this era
              const nominatorRewardQueries: Observable<{ stash: string; reward: BN }>[] = []
              stashToNominations.forEach((nominations, stashAddress) => {
                nominations.forEach((validatorAddress) => {
                  const validatorPoints = points.validators?.[validatorAddress]
                  if (!validatorPoints) return

                  const query$ = api.query.staking.erasStakers(era, validatorAddress).pipe(
                    first(),
                    map((exposure: any) => {
                      if (!exposure || exposure.isEmpty) return { stash: stashAddress, reward: BN_ZERO }
                      const nominatorExposure = exposure.others.find(
                        (other: any) => other.who.toString() === stashAddress
                      )
                      if (!nominatorExposure) return { stash: stashAddress, reward: BN_ZERO }

                      const nominatorStake = nominatorExposure.value.toBn()
                      if (nominatorStake.isZero()) return { stash: stashAddress, reward: BN_ZERO }

                      const validatorTotalStake = exposure.total.toBn()
                      if (validatorTotalStake.isZero()) return { stash: stashAddress, reward: BN_ZERO }

                      const validatorPointsNum = validatorPoints.toNumber()
                      const validatorReward = reward.muln(validatorPointsNum).divn(totalPoints)
                      const nominatorShare = validatorReward.mul(nominatorStake).div(validatorTotalStake)
                      return { stash: stashAddress, reward: nominatorShare }
                    }),
                    catchError(() => of({ stash: stashAddress, reward: BN_ZERO }))
                  )
                  nominatorRewardQueries.push(query$)
                })
              })

              // Combine all reward queries for this era
              const allRewardQueries = [...validatorRewardQueries, ...nominatorRewardQueries]
              if (allRewardQueries.length === 0) {
                return of({
                  totalRewards: BN_ZERO,
                  claimableRewards: BN_ZERO,
                  monthlyRewards: BN_ZERO,
                  lastEraRewards: BN_ZERO,
                  unclaimedEras: [] as number[],
                })
              }

              return combineLatest(allRewardQueries).pipe(
                map((rewards: { stash: string; reward: BN }[]) => {
                  let eraTotalRewards = BN_ZERO
                  let eraClaimableRewards = BN_ZERO
                  const unclaimedErasForEra: number[] = []

                  rewards.forEach(({ stash, reward }) => {
                    eraTotalRewards = eraTotalRewards.add(reward)
                    const stashClaimedEras = claimedErasByStash.get(stash) || new Set<number>()
                    const isClaimable = !stashClaimedEras.has(era) && era >= oldestEra && era < currentEra
                    if (isClaimable) {
                      eraClaimableRewards = eraClaimableRewards.add(reward)
                      if (!unclaimedErasForEra.includes(era)) {
                        unclaimedErasForEra.push(era)
                      }
                    }
                  })

                  const isMonthly = index >= erasRewards.length - ERA_PER_MONTH
                  const isLastEra = era === currentEra - 1

                  return {
                    totalRewards: eraTotalRewards,
                    claimableRewards: eraClaimableRewards,
                    monthlyRewards: isMonthly ? eraTotalRewards : BN_ZERO,
                    lastEraRewards: isLastEra ? eraTotalRewards : BN_ZERO,
                    unclaimedEras: unclaimedErasForEra,
                  }
                }),
                catchError(() =>
                  of({
                    totalRewards: BN_ZERO,
                    claimableRewards: BN_ZERO,
                    monthlyRewards: BN_ZERO,
                    lastEraRewards: BN_ZERO,
                    unclaimedEras: [] as number[],
                  })
                )
              )
            })

            return combineLatest(eraRewardPromises).pipe(
              map((eraResults) => {
                let totalRewards = BN_ZERO
                let claimableRewards = BN_ZERO
                let monthlyRewards = BN_ZERO
                let lastEraRewards = BN_ZERO
                const unclaimedEras: number[] = []

                eraResults.forEach((result) => {
                  totalRewards = totalRewards.add(result.totalRewards)
                  claimableRewards = claimableRewards.add(result.claimableRewards)
                  monthlyRewards = monthlyRewards.add(result.monthlyRewards)
                  lastEraRewards = lastEraRewards.add(result.lastEraRewards)
                  result.unclaimedEras.forEach((era) => {
                    if (!unclaimedEras.includes(era)) {
                      unclaimedEras.push(era)
                    }
                  })
                })

                return {
                  totalRewards,
                  lastEraRewards,
                  claimableRewards,
                  monthlyRewards,
                  unclaimedEras: unclaimedEras.sort((a, b) => a - b),
                  claimedEras: allClaimedEras.sort((a, b) => a - b),
                }
              })
            )
          })
        )
      })
    )
  }, [api?.isConnected, JSON.stringify(allAccounts.map((a) => a.address))])
}
