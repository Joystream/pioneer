import BN from 'bn.js'
import { useMemo } from 'react'
import { map, combineLatest, concatMap, EMPTY, merge, Observable, of } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const useCouncilRemainingPeriod = () => {
  const { api } = useApi()

  const remainingPeriod = useMemo(() => {
    if (!api) return

    const councilStageEnd = api.query.council.stage().pipe(
      concatMap(({ stage: councilStage, changedAt: start }): Observable<BN> => {
        if (councilStage.isIdle) {
          const length = api.consts.council.idlePeriodDuration
          return of(start.add(length))
        } else if (councilStage.isAnnouncing) {
          const length = api.consts.council.announcingPeriodDuration
          return of(start.add(length))
        }
        return EMPTY
      })
    )
    const referendumStageEnd = api.query.referendum.stage().pipe(
      concatMap((referendumStage): Observable<BN> => {
        if (referendumStage.isVoting) {
          const length = api.consts.referendum.voteStageDuration
          const start = referendumStage.asVoting.started
          return of(start.add(length))
        } else if (referendumStage.isRevealing) {
          const length = api.consts.referendum.revealStageDuration
          const start = referendumStage.asRevealing.started
          return of(start.add(length))
        }
        return EMPTY
      })
    )

    const periodEnd = merge(councilStageEnd, referendumStageEnd).pipe(map((end) => end.toNumber()))
    const currentBlock = api.rpc.chain.subscribeNewHeads().pipe(map(({ number }) => number.toNumber()))

    return combineLatest([periodEnd, currentBlock]).pipe(
      map(([periodEnd, currentBlock]) => Math.max(0, periodEnd - currentBlock))
    )
  }, [api])

  return useObservable(remainingPeriod, [remainingPeriod])
}
