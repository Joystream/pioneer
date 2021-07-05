import { useGroupSpending } from '@/working-groups/hooks/useGroupSpending'

import { useWorkers } from './useWorkers'

export function useGroupStatistics(groupId: string) {
  const { workers: allWorkers, isLoading: allLoading } = useWorkers({
    groupId,
  })

  const { spending } = useGroupSpending(groupId)
  const { workers: firedWorkers, isLoading: firedLoading } = useWorkers({ groupId, status: 'terminated' })
  return {
    statistics: {
      totalHired: allWorkers?.length,
      totalFired: firedWorkers?.length,
      spending,
    },
    isLoading: allLoading || firedLoading,
  }
}
