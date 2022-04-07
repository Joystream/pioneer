import { useGetLatestElectionQuery } from '@/council/queries'
import { asElection } from '@/council/types/Election'

export const useLatestElection = () => {
  const { loading, data } = useGetLatestElectionQuery()
  const rawElection = data?.electionRounds[0]

  return {
    isLoading: loading,
    election: rawElection && asElection(rawElection),
  }
}
