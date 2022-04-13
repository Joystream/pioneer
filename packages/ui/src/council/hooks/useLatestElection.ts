import { useGetLatestElectionQuery } from '@/council/queries'
import { asLatestElection } from '@/council/types/LatestElection'

export const useLatestElection = () => {
  const { loading, data } = useGetLatestElectionQuery()
  const rawElection = data?.electionRounds[0]

  return {
    isLoading: loading,
    election: rawElection && asLatestElection(rawElection),
  }
}
