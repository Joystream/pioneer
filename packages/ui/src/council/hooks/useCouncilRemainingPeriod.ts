import BN from 'bn.js'
import { map, combineLatest, concatMap, EMPTY, merge, Observable, of } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

import { electionStageObservable } from './useElectionStage'

export const useCouncilRemainingPeriod = (until: 'stageEnd' | 'electionEnd' = 'stageEnd') => {
  const { api } = useApi()

  return useObservable(() => {
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

    const stageEnd = merge(councilStageEnd, referendumStageEnd).pipe(map((end) => end.toNumber()))
    const periodEnd =
      until === 'electionEnd'
        ? stageEnd
        : combineLatest([stageEnd, electionStageObservable(api)]).pipe(
            map(([end, stage]) => {
              const announcingPeriodDuration = Number(api.consts.council.announcingPeriodDuration)
              const voteStageDuration = Number(api.consts.referendum.voteStageDuration)
              const revealStageDuration = Number(api.consts.referendum.revealStageDuration)

              switch (stage) {
                case 'inactive':
                  return end + announcingPeriodDuration + voteStageDuration + revealStageDuration
                case 'announcing':
                  return end + voteStageDuration + revealStageDuration
                case 'voting':
                  return end + revealStageDuration
                case 'revealing':
                  return end
              }
            })
          )

    const currentBlock = api.rpc.chain.subscribeNewHeads().pipe(map(({ number }) => number.toNumber()))

    return combineLatest([periodEnd, currentBlock]).pipe(
      map(([periodEnd, currentBlock]) => Math.max(0, periodEnd - currentBlock))
    )
  }, [api?.isConnected])
}
