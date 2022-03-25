import { useGetCurrentElectionQuery } from '@/council/queries'
import { asElection } from '@/council/types/Election'

export const useCurrentElection = () => {
  const { loading, data } = useGetCurrentElectionQuery()
  const rawElection = data?.electionRounds[0]

  return {
    isLoading: loading,
    election: rawElection && asElection(rawElection),
  }
}
