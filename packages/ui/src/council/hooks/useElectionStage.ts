import { useMemo } from 'react'
import { concatMap, EMPTY, merge, Observable, of } from 'rxjs'

import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { ElectionStage } from '@/council/types/Election'

interface UseElectionStage {
  isLoading: boolean
  stage: ElectionStage
}

export const useElectionStage = (): UseElectionStage => {
  const { api } = useApi()

  const stageObservable = useMemo(() => {
    if (!api) return

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
  }, [api])

  const stage = useObservable(stageObservable, [stageObservable])

  return { isLoading: !stage, stage: stage ?? 'inactive' }
}
