import { useGetCurrentElectionQuery } from '@/council/queries'
import { asElection } from '@/council/types/Election'

export const useCurrentElection = () => {
  const { loading, data, refetch } = useGetCurrentElectionQuery()
  const rawElection = data?.electionRounds[0]

  return {
    isLoading: loading,
    election: rawElection && asElection(rawElection),
    refetch,
  }
}
