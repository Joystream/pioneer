import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { CastVoteOrderByInput } from '@/common/api/queries'

import { useGetCouncilVotesQuery } from '../queries'
import { asVote } from '../types/Vote'

export const useMyPastVotes = () => {
  const { allAccounts } = useMyAccounts()
  const { data, loading } = useGetCouncilVotesQuery({
    variables: {
      where: {
        castBy_in: allAccounts.map((account) => account.address),
        electionRound: { isFinished_eq: true },
      },
      orderBy: [CastVoteOrderByInput.CreatedAtDesc],
    },
  })
  return {
    votes: data?.castVotes.map(asVote),
    isLoading: loading,
  }
}
