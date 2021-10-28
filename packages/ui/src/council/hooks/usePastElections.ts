import { useMemo } from 'react'

import { ElectionRoundOrderByInput } from '@/common/api/queries'
import { toQueryOrderByInput, SortOrder } from '@/common/hooks/useSort'
import { useGetPastElectionsCountQuery, useGetPastElectionsQuery } from '@/council/queries'

import { asPastElection } from '../types/PastElection'

export const ELECTION_PER_PAGE = 10

interface UsePastElectionsProps {
  page?: number
  order: SortOrder<ElectionRoundOrderByInput>
}

export const usePastElections = ({ page = 1, order }: UsePastElectionsProps) => {
  const variables = {
    orderBy: [toQueryOrderByInput<ElectionRoundOrderByInput>(order)],
    limit: ELECTION_PER_PAGE,
    offset: (page - 1) * ELECTION_PER_PAGE,
  }

  const { loading: loadingElections, data: electionsData } = useGetPastElectionsQuery({ variables })
  const { loading: loadingCount, data: countData } = useGetPastElectionsCountQuery()

  const elections = useMemo(
    () => electionsData && electionsData.electionRounds && electionsData.electionRounds.map(asPastElection),
    [electionsData, loadingElections]
  )
  const totalCount = countData?.electionRoundsConnection.totalCount ?? 0

  return {
    isLoading: loadingElections || loadingCount,
    elections,
    pageCount: totalCount && Math.ceil(totalCount / ELECTION_PER_PAGE),
  }
}
