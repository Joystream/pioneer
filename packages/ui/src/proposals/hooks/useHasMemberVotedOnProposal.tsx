import { useGetMemberVoteCountOnProposalQuery } from '@/proposals/queries'

export const useHasMemberVotedOnProposal = (proposalId: string, memberId?: string) => {
  const { data } = useGetMemberVoteCountOnProposalQuery({
    variables: {
      where: {
        proposal: {
          id_eq: proposalId,
        },
        voter: {
          id_eq: memberId,
        },
      },
    },
    skip: !memberId,
  })

  return typeof data?.proposalVotedEventsConnection.totalCount === 'number'
    ? !!data?.proposalVotedEventsConnection.totalCount
    : undefined
}
