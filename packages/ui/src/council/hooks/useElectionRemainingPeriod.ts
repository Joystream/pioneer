import { useMemo } from 'react'
import { map } from 'rxjs'

import { useApi } from '@/common/hooks/useApi'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useObservable } from '@/common/hooks/useObservable'
import { ElectionStage } from '@/council/types/Election'

export const useElectionRemainingPeriod = (electionStage: ElectionStage | undefined) => {
  const { api } = useApi()
  const currentBlock = useCurrentBlockNumber()

  const periodLength = useMemo(() => {
    switch (electionStage) {
      case 'inactive':
        return api?.consts.council.idlePeriodDuration
      case 'announcing':
        return api?.consts.council.announcingPeriodDuration
      case 'voting':
        return api?.consts.referendum?.voteStageDuration
      case 'revealing':
        return api?.consts.referendum?.revealStageDuration
    }
  }, [api, electionStage])

  const periodStart = useMemo(() => {
    switch (electionStage) {
      case 'inactive':
      case 'announcing':
        return api?.query.council.stage().pipe(map(({ changed_at }) => changed_at))
      case 'voting':
        return api?.query.referendum.stage().pipe(map(({ asVoting }) => asVoting.started))
      case 'revealing':
        return api?.query.referendum.stage().pipe(map(({ asRevealing }) => asRevealing.started))
    }
  }, [api, electionStage])

  const remainingPeriod = useMemo(() => {
    if (periodLength && currentBlock)
      return periodStart?.pipe(map((start) => start.add(periodLength).sub(currentBlock)))
  }, [periodStart, periodLength, currentBlock])

  return useObservable(remainingPeriod, [remainingPeriod])
}
