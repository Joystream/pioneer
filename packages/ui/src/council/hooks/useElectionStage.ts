import { useMemo } from 'react'
import { concatMap, map, Observable, of } from 'rxjs'

import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { ElectionStage } from '@/council/types/Election'

interface UseElectionStage {
  isLoading: boolean
  stage: ElectionStage
}

export const useElectionStage = (): UseElectionStage => {
  const { api } = useApi()
  const stageObservable = useMemo(
    () =>
      api?.query.council.stage().pipe(
        concatMap(({ stage: councilStage }): Observable<ElectionStage> => {
          if (councilStage.isAnnouncing) {
            return of('announcing')
          } else if (councilStage.isElection) {
            return api.query.referendum.stage().pipe(
              map((electionStage) => {
                if (electionStage.isVoting) {
                  return 'voting'
                } else if (electionStage.isRevealing) {
                  return 'revealing'
                } else {
                  return 'inactive'
                }
              })
            )
          } else {
            return of('inactive')
          }
        })
      ),
    [api]
  )

  const stage = useObservable(stageObservable, [stageObservable])

  return { isLoading: !stage, stage: stage ?? 'inactive' }
}
