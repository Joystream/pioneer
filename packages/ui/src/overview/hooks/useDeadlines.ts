import { asElection } from '@/council/types/Election'
import { useGetAllDeadLinesQuery } from '@/overview/queries'
import { asUpcomingWorkingGroupOpening } from '@/working-groups/types'

interface UseDeadlinesParams {
  groupId?: string
}

export const useDeadlines = (params?: UseDeadlinesParams) => {
  const options = params?.groupId || {}
  const { loading, data } = useGetAllDeadLinesQuery(options)
  const rawElection = data?.electionRounds[0]
  return {
    isLoading: loading,
    election: rawElection && asElection(rawElection),
    proposals: data?.proposals || [],
    upcomingOpenings: data?.upcomingWorkingGroupOpenings.map(asUpcomingWorkingGroupOpening) || [],
    openings: data?.workingGroupOpenings || [],
  }
}
