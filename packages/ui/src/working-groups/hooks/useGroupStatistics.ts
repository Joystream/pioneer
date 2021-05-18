import { useWorkers } from './useWorkers'

export function useGroupStatistics(groupId: string) {
  const { workers: allWorkers, isLoading: allLoading } = useWorkers({
    groupId,
    statusIn: ['active', 'left', 'terminated'],
  })
  const { workers: firedWorkers, isLoading: firedLoading } = useWorkers({ groupId, statusIn: ['terminated'] })
  return {
    statistics: {
      totalHired: allWorkers?.length,
      totalFired: firedWorkers?.length,
      spending: 12000,
    },
    isLoading: allLoading || firedLoading,
  }
}
