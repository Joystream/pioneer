import BN from 'bn.js'
import { combineLatest, map, of, switchMap } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export interface SlashEvent {
  era: number
  validatorAddress: string
  slashedAmount: BN
  ownSlash: BN
  isValidator: boolean
  blockNumber?: number
  timestamp?: number
}

/**
 * Hook to get slashing history for all user accounts
 * Checks the last 84 eras for any slashing events
 */
export const useSlashingHistory = (addresses: string[]): SlashEvent[] | undefined => {
  const { api } = useApi()

  return useObservable(() => {
    if (!api || !addresses.length) return of(undefined)

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

        // Check last 84 eras (21 days with 4 eras/day)
        const erasToCheck = 84
        const startEra = Math.max(0, currentEra - erasToCheck)
        const eras = Array.from({ length: Math.min(erasToCheck, currentEra - startEra) }, (_, i) => startEra + i)

        // For each address and era, check for slashing events
        const slashQueries$ = combineLatest(
          addresses.flatMap((address) =>
            eras.map((era) =>
              combineLatest([
                // Check validator slashing
                api.query.staking.validatorSlashInEra(era, address).pipe(
                  map((slash) => ({
                    era,
                    address,
                    isValidator: true,
                    slashData: slash.isSome ? slash.unwrap() : null,
                  }))
                ),
                // Check nominator slashing
                api.query.staking.nominatorSlashInEra(era, address).pipe(
                  map((slash) => ({
                    era,
                    address,
                    isValidator: false,
                    slashData: slash.isSome ? slash.unwrap().toBn() : null,
                  }))
                ),
              ])
            )
          )
        )

        return slashQueries$.pipe(
          map((results) => {
            const slashEvents: SlashEvent[] = []

            results.forEach(([validatorResult, nominatorResult]) => {
              // Process validator slashing
              if (validatorResult.slashData) {
                const [ownSlash, totalSlash] = validatorResult.slashData as [any, any]
                slashEvents.push({
                  era: validatorResult.era,
                  validatorAddress: validatorResult.address,
                  slashedAmount: totalSlash.toBn(),
                  ownSlash: ownSlash.toBn(),
                  isValidator: true,
                })
              }

              // Process nominator slashing
              if (nominatorResult.slashData && !(nominatorResult.slashData as BN).isZero()) {
                slashEvents.push({
                  era: nominatorResult.era,
                  validatorAddress: nominatorResult.address,
                  slashedAmount: nominatorResult.slashData as BN,
                  ownSlash: nominatorResult.slashData as BN,
                  isValidator: false,
                })
              }
            })

            // Sort by era descending (most recent first)
            return slashEvents.sort((a, b) => b.era - a.era)
          })
        )
      })
    )
  }, [api?.isConnected, JSON.stringify(addresses)])
}
