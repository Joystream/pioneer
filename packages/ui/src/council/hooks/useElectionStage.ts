import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { ElectionStage } from '@/council/types/Election'

interface UseElectionStage {
  isLoading: boolean
  stage: ElectionStage
}

export const useElectionStage = (): UseElectionStage => {
  const { api } = useApi()
  const electionStage = useObservable(api?.query.referendum.stage(), [api])
  const councilStage = useObservable(api?.query.council.stage(), [api])

  if (!councilStage || !electionStage) {
    return { isLoading: true, stage: 'inactive' }
  }

  if (!councilStage || !electionStage || councilStage.stage.isIdle) {
    return { isLoading: false, stage: 'inactive' }
  }

  if (councilStage.stage.isAnnouncing) {
    return { isLoading: false, stage: 'announcing' }
  }

  if (electionStage.isVoting) {
    return { isLoading: false, stage: 'voting' }
  }

  return { isLoading: false, stage: 'revealing' }
}
