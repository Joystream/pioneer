import { sum } from 'lodash'
import { map, combineLatest } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

import { electionStageObservable } from './useElectionStage'

export const useCouncilPeriodInformation = () => {
  const { api } = useApi()

  return useObservable(() => {
    if (!api) return

    const periodData = electionStageObservable(api).pipe(
      map(({ stage, changedAt: start }) => {
        const durations = [
          api.consts.council.idlePeriodDuration,
          api.consts.council.announcingPeriodDuration,
          api.consts.referendum.voteStageDuration,
          api.consts.referendum.revealStageDuration,
        ].map(Number)
        const position = ['inactive', 'announcing', 'voting', 'revealing'].indexOf(stage)
        const periodStarts = durations.map((_, index) =>
          index < position
            ? start - sum(durations.slice(index, position))
            : start + sum(durations.slice(position, index))
        )
        const periodEnds = periodStarts.map((periodStart, index) => periodStart + durations[index])

        return { stage, periodStarts, periodEnds, currentStage: stage, currentStageIndex: position }
      })
    )

    const currentBlock = api.rpc.chain.subscribeNewHeads().pipe(map(({ number }) => number.toNumber()))

    return combineLatest([periodData, currentBlock]).pipe(
      map(([periodData, currentBlock]) => {
        const periodEnd = periodData.periodEnds[periodData.currentStageIndex]
        return { ...periodData, currentBlock: currentBlock, remainingPeriod: Math.max(0, periodEnd - currentBlock) }
      })
    )
  }, [api?.isConnected])
}
