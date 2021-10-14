import { useGetElectionVotesQuery } from '../queries'
import { asVote } from '../types/Vote'

export const useElectionVotes = (electionCycleId: number) => {
  const { data, loading } = useGetElectionVotesQuery({ variables: { electionCycleId } })
  return {
    votes: data?.castVotes.map(asVote),
    isLoading: loading,
  }
}
