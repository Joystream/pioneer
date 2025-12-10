import BN from 'bn.js'
import { combineLatest, map, of, switchMap } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export interface BagInfo {
  bagUpper: BN
  nodeCount: number
}

export interface BagsListData {
  bags: BagInfo[]
  totalBags: number
}

/**
 * Hook to get the bags list data from the staking pallet
 * The bags list organizes nominators by their bonded stake
 */
export const useBagsList = (): BagsListData | undefined => {
  const { api } = useApi()

  return useObservable(() => {
    if (!api) {
      return of(undefined)
    }

    // Check if bagsList pallet exists
    if (!api.query.bagsList || !api.query.bagsList.bagThresholds) {
      return of({
        bags: [],
        totalBags: 0,
      })
    }

    // Get bag thresholds
    return api.query.bagsList.bagThresholds().pipe(
      switchMap((thresholdsCodec: any) => {
        if (!thresholdsCodec) {
          return of({
            bags: [],
            totalBags: 0,
          })
        }

        // Convert codec to array of numbers
        const thresholds = (thresholdsCodec.toJSON ? thresholdsCodec.toJSON() : []) as number[]

        if (!thresholds || thresholds.length === 0) {
          return of({
            bags: [],
            totalBags: 0,
          })
        }

        // Query list bags for each bag threshold
        const bagQueries = thresholds.map((threshold) => {
          if (!api.query.bagsList?.listBags) {
            return of({ bagUpper: new BN(threshold), nodeCount: 0 })
          }

          // Get the bag data for this threshold
          return (api.query.bagsList.listBags as any)(threshold).pipe(
            map((bagCodec: any) => {
              if (!bagCodec || (bagCodec.isNone && bagCodec.isNone())) {
                return { bagUpper: new BN(threshold), nodeCount: 0 }
              }

              const bagData = bagCodec.unwrap ? bagCodec.unwrap() : bagCodec
              const bagJson = bagData.toJSON ? bagData.toJSON() : bagData

              // Count nodes in the bag if head exists
              let nodeCount = 0
              if (bagJson && (bagJson as any).head) {
                nodeCount = 1
              }

              return {
                bagUpper: new BN(threshold),
                nodeCount,
              }
            })
          )
        })

        if (bagQueries.length === 0) {
          return of({
            bags: [],
            totalBags: 0,
          })
        }

        return combineLatest(bagQueries).pipe(
          map((bags) => ({
            bags: bags.filter((bag) => bag.nodeCount > 0),
            totalBags: bags.filter((bag) => bag.nodeCount > 0).length,
          }))
        )
      })
    )
  }, [api?.isConnected])
}
