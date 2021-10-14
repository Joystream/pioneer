import { useGetElectionVotesQuery } from '../queries'
import { asVote } from '../types/Vote'

export const useElectionVotes = (electionRoundId: string) => {
  const { data, loading } = useGetElectionVotesQuery({ variables: { electionRoundId } })
  return {
    votes: data?.castVotes.map(asVote),
    isLoading: loading,
  }
}
