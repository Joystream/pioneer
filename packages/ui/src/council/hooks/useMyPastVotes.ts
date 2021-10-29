import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { CastVoteOrderByInput } from '@/common/api/queries'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'

import { useGetCouncilVotesQuery } from '../queries'
import { asVote } from '../types/Vote'

interface UseMyPastVotesProps {
  order: SortOrder<CastVoteOrderByInput>
}

export const useMyPastVotes = ({ order }: UseMyPastVotesProps) => {
  const { allAccounts } = useMyAccounts()
  const variables = {
    where: {
      castBy_in: allAccounts.map((account) => account.address),
      electionRound: { isFinished_eq: true },
    },
    orderBy: [toQueryOrderByInput<CastVoteOrderByInput>(order)],
  }

  const { data, loading } = useGetCouncilVotesQuery({ variables })

  return {
    votes: data?.castVotes.map(asVote),
    isLoading: loading,
  }
}
