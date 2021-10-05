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
      case 'revealing':
        return api?.consts.referendum.revealStageDuration
      case 'voting':
        return api?.consts.referendum.voteStageDuration
    }
  }, [api, electionStage])

  const remainingPeriod = useMemo(() => {
    if (periodLength && currentBlock)
      return api?.query.council.stage().pipe(map(({ changed_at }) => changed_at.add(periodLength).sub(currentBlock)))
  }, [api, periodLength, currentBlock])

  return useObservable(remainingPeriod, [remainingPeriod])
}
