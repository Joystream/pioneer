import { useMemo } from 'react'

import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { asElection } from '@/council/types/Election'
import { Member } from '@/memberships/types'
import { useGetAllDeadLinesQuery } from '@/overview/queries'
import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'
import { asUpcomingWorkingGroupOpening } from '@/working-groups/types'

interface UseDeadlinesParams {
  groupId?: string
  member: Member
}

export type DeadlineNamespace = 'elections' | 'proposals' | 'openings' | 'upcomingOpenings'

const initializer: Record<DeadlineNamespace, string[]> = {
  proposals: [],
  openings: [],
  upcomingOpenings: [],
  elections: [],
}

export const useDeadlines = (params: UseDeadlinesParams) => {
  const { isLoading: isLoadingWorkingGroup, groups } = useWorkingGroups()
  const groupIds = useMemo(
    () => groups.flatMap((group) => (group.leadId === params.member.id ? group.id : [])),
    [params.member.id, groups.length]
  )
  const variables = {
    proposalCreator: params.member.isCouncilMember ? undefined : { id_eq: params.member.id },
    isLead: groupIds.length > 0,
    group: groupIds.length > 0 ? { id_in: groupIds } : undefined,
  }
  const { stage: electionStage } = useElectionStage()
  const { loading, data } = useGetAllDeadLinesQuery({ variables, skip: isLoadingWorkingGroup })
  const [storageDeadlines = initializer, setStorageDeadlines] =
    useLocalStorage<Record<DeadlineNamespace, string[]>>('deadlines')

  const hideForStorage = (namespace: DeadlineNamespace) => (id: string) => {
    setStorageDeadlines({
      ...storageDeadlines,
      [namespace]: [...storageDeadlines[namespace], id],
    })
  }

  const deadlines = useMemo((): Record<DeadlineNamespace, any[]> => {
    const election = data?.electionRounds.map(asElection) ?? []
    const proposals = data?.proposals ?? []
    const upcomingOpenings = data?.upcomingWorkingGroupOpenings?.map(asUpcomingWorkingGroupOpening) ?? []
    const openings = data?.workingGroupOpenings ?? []
    return {
      proposals: proposals.filter((proposal) => !storageDeadlines.proposals.includes(proposal.id)),
      elections:
        election?.filter((election) => !storageDeadlines.elections.includes(`${election.cycleId}:${electionStage}`)) ??
        [],
      openings: openings.filter((opening) => !storageDeadlines.openings.includes(opening.id)),
      upcomingOpenings: upcomingOpenings.filter(
        (upcomingOpening) => !storageDeadlines.upcomingOpenings.includes(upcomingOpening.id)
      ),
    }
  }, [data, storageDeadlines, electionStage])

  return {
    isLoading: isLoadingWorkingGroup || loading,
    deadlines,
    hideForStorage,
    count: Object.values(deadlines).flat().length,
  }
}
