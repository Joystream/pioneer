import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { CastVoteOrderByInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'

import { useGetCouncilVotesCountQuery, useGetCouncilVotesQuery } from '../queries'
import { asVote } from '../types/Vote'

interface UseMyPastVotesProps {
  order: SortOrder<CastVoteOrderByInput>
  perPage?: number
}

export const useMyPastVotes = ({ order, perPage = 5 }: UseMyPastVotesProps) => {
  const { allAccounts } = useMyAccounts()

  const where = {
    castBy_in: allAccounts.map((account) => account.address),
    electionRound: { isFinished_eq: true },
  }

  const { data: countData, loading: countLoading } = useGetCouncilVotesCountQuery({ variables: { where } })
  const totalCount = countData?.castVotesConnection.totalCount
  const { offset, pagination } = usePagination(perPage, totalCount ?? 0, [order, totalCount])

  const variables = {
    where,
    orderBy: [toQueryOrderByInput<CastVoteOrderByInput>(order)],
    limit: perPage,
    offset,
  }

  const { data, loading } = useGetCouncilVotesQuery({ variables })

  return {
    votes: data?.castVotes.map(asVote),
    isLoading: loading || countLoading,
    pagination: pagination,
  }
}
