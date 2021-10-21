import { useGetProposalVotesQuery } from '../queries'
import { asProposalVote } from '../types'

export const useProposalVotesByMember = (proposalId: string, memberId?: string) => {
  const { data, loading } = useGetProposalVotesQuery({
    variables: { where: { proposal: { id_eq: proposalId }, voter: { id_eq: memberId ?? '-1' } } },
  })
  const votes = data?.proposalVotedEvents.map(asProposalVote)
  return { votes, isLoading: loading }
}
