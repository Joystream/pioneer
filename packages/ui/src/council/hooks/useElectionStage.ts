import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

type ElectionState = 'announcing' | 'voting' | 'revealing' | 'inactive'

export const useElectionStage = (): ElectionState => {
  const { api } = useApi()
  const electionStage = useObservable(api?.query.referendum.stage(), [api])
  const councilStage = useObservable(api?.query.council.stage(), [api])

  if (!councilStage || !electionStage || councilStage.stage.isIdle) {
    return 'inactive'
  }

  if (councilStage.stage.isAnnouncing) {
    return 'announcing'
  }

  if (electionStage.isVoting) {
    return 'voting'
  }

  return 'revealing'
}
