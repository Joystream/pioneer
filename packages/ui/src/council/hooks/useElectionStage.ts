import { concatMap, EMPTY, merge, Observable, of } from 'rxjs'

import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { ElectionStage } from '@/council/types/Election'

interface UseElectionStage {
  isLoading: boolean
  stage: ElectionStage
}

export const useElectionStage = (): UseElectionStage => {
  const { api } = useApi()
  const stage = useObservable(() => api && electionStageObservable(api), [api?.isConnected])

  return { isLoading: !stage, stage: stage ?? 'inactive' }
}

export const electionStageObservable = (api: Api) => {
  const councilObservable = api.query.council.stage().pipe(
    concatMap(({ stage: councilStage }): Observable<ElectionStage> => {
      if (councilStage.isIdle) {
        return of('inactive')
      } else if (councilStage.isAnnouncing) {
        return of('announcing')
      }
      return EMPTY
    })
  )
  const referendumObservable = api.query.referendum.stage().pipe(
    concatMap((referendumStage): Observable<ElectionStage> => {
      if (referendumStage.isVoting) {
        return of('voting')
      } else if (referendumStage.isRevealing) {
        return of('revealing')
      }
      return EMPTY
    })
  )

  return merge(councilObservable, referendumObservable)
}
