import { u32 } from '@polkadot/types-codec'
import { concatMap, EMPTY, map, merge, Observable, of } from 'rxjs'

import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { ElectionStage } from '@/council/types/Election'

interface StageInfo {
  stage: ElectionStage
  changedAt: u32
}
interface UseElectionStage {
  isLoading: boolean
  stage: ElectionStage
  changedAt?: number
}

export const useElectionStage = (): UseElectionStage => {
  const { api } = useApi()
  const stage = useObservable(() => api && electionStageObservable(api), [api?.isConnected])

  return { isLoading: !stage, ...(stage ?? { stage: 'inactive' }) }
}

export const electionStageObservable = (api: Api) => {
  const councilObservable = api.query.council.stage().pipe(
    concatMap(({ stage: councilStage, changedAt }): Observable<StageInfo> => {
      if (councilStage.isIdle) {
        return of({ stage: 'inactive', changedAt })
      } else if (councilStage.isAnnouncing) {
        return of({ stage: 'announcing', changedAt })
      }
      return EMPTY
    })
  )
  const referendumObservable = api.query.referendum.stage().pipe(
    concatMap((referendumStage): Observable<StageInfo> => {
      if (referendumStage.isVoting) {
        return of({ stage: 'voting', changedAt: referendumStage.asVoting.started })
      } else if (referendumStage.isRevealing) {
        return of({ stage: 'revealing', changedAt: referendumStage.asRevealing.started })
      }
      return EMPTY
    })
  )

  return merge(councilObservable, referendumObservable).pipe(
    map(({ stage, changedAt }) => ({ stage, changedAt: Number(changedAt) }))
  )
}
