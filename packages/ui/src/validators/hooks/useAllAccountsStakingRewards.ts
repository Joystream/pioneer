import BN from 'bn.js'
import { combineLatest, filter, first, map, of, switchMap, catchError } from 'rxjs'

import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO, ERA_DEPTH } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'

export interface AccountStakingRewards {
  address: string
  totalEarned: BN
  claimable: BN
  hasClaimable: boolean
}

interface EraInfo {
  currentEra: number
  oldestEra: number
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

export const useAllAccountsStakingRewards = (accounts: Account[]): Map<string, AccountStakingRewards> | undefined => {
  const { api } = useApi()

  return useObservable(() => {
    if (!api || !accounts.length) return of(undefined)

    const addresses = accounts.map((account) => account.address)

    // Ensure API is ready before making queries
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

    const eraInfo$ = api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        const currentEra = activeEra.unwrap().index.toNumber()
        return { currentEra, oldestEra: Math.max(0, currentEra - ERA_DEPTH) }
      }),
      catchError(() => of(undefined))
    )

    return isReady$.pipe(
      switchMap(() => eraInfo$),
      switchMap((eraInfo) => {
        if (!eraInfo || typeof eraInfo !== 'object' || !('currentEra' in eraInfo) || !('oldestEra' in eraInfo)) {
          return of(new Map<string, AccountStakingRewards>())
        }

        const { currentEra, oldestEra } = eraInfo as EraInfo

        const bonded$ = api.query.staking.bonded.multi(addresses)
        const validators$ = api.query.staking.validators.multi(addresses)

        return combineLatest([bonded$, validators$]).pipe(
          switchMap(([bondedEntries, validatorPrefs]) => {
            const validatorStashes: string[] = []
            const stashToIndex = new Map<string, number>()

            bondedEntries.forEach((bonded, index) => {
              const address = addresses[index]
              const validatorPref = validatorPrefs[index]
              if (bonded.isSome && validatorPref && !validatorPref.isEmpty) {
                validatorStashes.push(address)
                stashToIndex.set(address, index)
              }
            })

            if (validatorStashes.length === 0) {
              return of(new Map<string, AccountStakingRewards>())
            }

            const stashToController = new Map<string, string>()
            const controllers: string[] = []

            validatorStashes.forEach((stash) => {
              const index = stashToIndex.get(stash)
              if (index !== undefined) {
                const bonded = bondedEntries[index]
                if (bonded.isSome) {
                  const controller = bonded.unwrap().toString()
                  stashToController.set(stash, controller)
                  controllers.push(controller)
                }
              }
            })

            const ledgers$ =
              controllers.length > 0
                ? api.query.staking.ledger.multi(controllers).pipe(
                    map((ledgers) => {
                      const ledgerMap = new Map<string, { claimedRewards: number[]; controller: string }>()
                      controllers.forEach((controller, index) => {
                        const ledger = ledgers[index]
                        if (ledger.isSome) {
                          const ledgerData = ledger.unwrap()
                          const stash = ledgerData.stash.toString()
                          const claimedRewards = ledgerData.claimedRewards.map((era) => era.toNumber())
                          saveCachedClaimedEras(stash, claimedRewards)
                          ledgerMap.set(stash, { claimedRewards, controller })
                        }
                      })
                      return ledgerMap
                    }),
                    catchError(() => of(new Map()))
                  )
                : of(new Map())

            return ledgers$.pipe(
              switchMap((ledgerMap) => {
                validatorStashes.forEach((stash) => {
                  if (!ledgerMap.has(stash)) {
                    const cached = getCachedClaimedEras(stash)
                    if (cached.size > 0) {
                      ledgerMap.set(stash, { claimedRewards: Array.from(cached), controller: '' })
                    }
                  }
                })

                const erasRewards$ = api.derive.staking.erasRewards().pipe(catchError(() => of([])))
                const erasPoints$ = api.derive.staking.erasPoints().pipe(catchError(() => of([])))

                return combineLatest([erasRewards$, erasPoints$]).pipe(
                  map(([erasRewards, erasPoints]) => {
                    const pointsByEra = new Map(erasPoints.map((points: any) => [points.era.toNumber(), points]))

                    const rewardsMap = new Map<string, AccountStakingRewards>()

                    const claimedRewardsByStash = new Map<string, Set<number>>()
                    validatorStashes.forEach((address) => {
                      const ledgerInfo = ledgerMap.get(address)
                      const claimedRewards = ledgerInfo?.claimedRewards || []
                      claimedRewardsByStash.set(address, new Set(claimedRewards))
                    })

                    erasRewards.forEach((reward: any) => {
                      const era = reward.era.toNumber()
                      if (era < oldestEra || era >= currentEra) return

                      const points = pointsByEra.get(era)
                      if (!points || reward.eraReward.isZero()) return

                      const totalPoints = points.eraPoints.toNumber()
                      if (totalPoints === 0) return

                      validatorStashes.forEach((address) => {
                        const validatorPoints = points.validators[address]
                        if (!validatorPoints) return

                        const validatorPointsNum = validatorPoints.toNumber()
                        const validatorReward = reward.eraReward.muln(validatorPointsNum).divn(totalPoints)

                        // Find or create entry for this stash (similar to polkadot-js/apps pattern)
                        let stashRewards = rewardsMap.get(address)
                        if (!stashRewards) {
                          stashRewards = {
                            address,
                            totalEarned: BN_ZERO,
                            claimable: BN_ZERO,
                            hasClaimable: false,
                          }
                          rewardsMap.set(address, stashRewards)
                        }

                        stashRewards.totalEarned = stashRewards.totalEarned.add(validatorReward)

                        // Check if era is unclaimed using Set lookup (O(1) instead of O(n))
                        const claimedEras = claimedRewardsByStash.get(address)
                        if (claimedEras && !claimedEras.has(era)) {
                          stashRewards.claimable = stashRewards.claimable.add(validatorReward)
                          stashRewards.hasClaimable = true
                        }
                      })
                    })

                    return rewardsMap
                  }),
                  catchError(() => of(new Map()))
                )
              })
            )
          })
        )
      })
    )
  }, [api?.isConnected, JSON.stringify(accounts.map((a) => a.address))])
}
