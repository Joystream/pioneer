import { useGetVoteWithDetailsQuery } from '@/proposals/queries'
import { asVoteWithDetails, ProposalVoteWithDetails } from '@/proposals/types'

interface UseProposalVote {
  isLoading: boolean
  vote: ProposalVoteWithDetails | null
}

export const useProposalVote = (id: string): UseProposalVote => {
  const { data, loading } = useGetVoteWithDetailsQuery({ variables: { id } })

  if (loading || !data?.proposalVotedEventByUniqueInput) {
    return {
      isLoading: loading,
      vote: null,
    }
  }

  return {
    isLoading: loading,
    vote: asVoteWithDetails(data.proposalVotedEventByUniqueInput),
  }
}
