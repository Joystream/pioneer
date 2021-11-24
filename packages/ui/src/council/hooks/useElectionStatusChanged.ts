import { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'

import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { ElectionRoutes } from '@/council/constants'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { ElectionStage } from '@/council/types/Election'

export const LocalStorageKey = 'LastElectionStage'

export const useElectionStatusChanged = () => {
  const { stage: electionStage } = useElectionStage()
  const [lastStage, setLastStage] = useLocalStorage<ElectionStage>(LocalStorageKey)
  const isCurrentElectionTab = !!useRouteMatch(ElectionRoutes.currentElection)

  useEffect(() => {
    if (isCurrentElectionTab) {
      setLastStage(electionStage)
    }
  }, [isCurrentElectionTab, electionStage])

  return {
    hasChanged: lastStage !== electionStage,
  }
}
