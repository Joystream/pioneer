import { useMemo } from 'react'

import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { asElection } from '@/council/types/Election'
import { useGetAllDeadLinesQuery } from '@/overview/queries'
import { asUpcomingWorkingGroupOpening } from '@/working-groups/types'

interface UseDeadlinesParams {
  groupId?: string
}

export type DeadlineNamespace = 'election' | 'proposals' | 'openings' | 'upcomingOpenings'

const initializer: Record<DeadlineNamespace, string[]> = {
  proposals: [],
  openings: [],
  upcomingOpenings: [],
  election: [],
}

export const useDeadlines = (params?: UseDeadlinesParams) => {
  const options = params?.groupId || {}
  const { loading, data } = useGetAllDeadLinesQuery(options)
  const [storageDeadlines = initializer, setStorageDeadlines] =
    useLocalStorage<Record<DeadlineNamespace, string[]>>('deadlines')

  const hideForStorage = (namespace: DeadlineNamespace) => (id: string) => {
    setStorageDeadlines({
      ...storageDeadlines,
      [namespace]: [...storageDeadlines[namespace], id],
    })
  }

  const deadlines = useMemo((): Record<DeadlineNamespace, any[]> => {
    const rawElection = data?.electionRounds[0]
    const election = rawElection && asElection(rawElection)
    const proposals = data?.proposals || []
    const upcomingOpenings = data?.upcomingWorkingGroupOpenings.map(asUpcomingWorkingGroupOpening) || []
    const openings = data?.workingGroupOpenings || []
    return {
      proposals: proposals.filter((proposal) => !storageDeadlines.proposals.includes(proposal.id)),
      election: election?.candidates.filter((candidate) => !storageDeadlines.election.includes(candidate.id)) ?? [],
      openings: openings.filter((opening) => !storageDeadlines.openings.includes(opening.id)),
      upcomingOpenings: upcomingOpenings.filter(
        (upcomingOpening) => !storageDeadlines.upcomingOpenings.includes(upcomingOpening.id)
      ),
    }
  }, [data, storageDeadlines])

  return {
    isLoading: loading,
    deadlines,
    hideForStorage,
    count: Object.values(deadlines).flat().length,
  }
}
