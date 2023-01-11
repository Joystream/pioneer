import { sum } from 'lodash'
import { map, combineLatest } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

import { electionStageObservable } from './useElectionStage'

export const useCouncilRemainingPeriod = (until: 'stageEnd' | 'electionEnd' = 'stageEnd') => {
  const { api } = useApi()

  return useObservable(() => {
    if (!api) return

    const periodEnd = electionStageObservable(api).pipe(
      map(({ stage, changedAt: start }) => {
        const durations = [
          api.consts.council.announcingPeriodDuration,
          api.consts.referendum.voteStageDuration,
          api.consts.referendum.revealStageDuration,
          api.consts.council.idlePeriodDuration,
        ].map(Number)
        const position = ['announcing', 'voting', 'revealing', 'inactive'].indexOf(stage)
        const offset = until === 'stageEnd' ? 1 : durations.length

        return start + sum(durations.slice(position, position + offset))
      })
    )

    const currentBlock = api.rpc.chain.subscribeNewHeads().pipe(map(({ number }) => number.toNumber()))

    return combineLatest([periodEnd, currentBlock]).pipe(
      map(([periodEnd, currentBlock]) => Math.max(0, periodEnd - currentBlock))
    )
  }, [api?.isConnected])
}
