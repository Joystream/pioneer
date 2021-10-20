import { useMemo } from 'react'

import { ElectionRoundOrderByInput } from '@/common/api/queries'
import { useGetPastElectionsCountQuery, useGetPastElectionsQuery } from '@/council/queries'

import { asPastElection } from '../types/PastElection'

export const ELECTION_PER_PAGE = 10

export type PastElectionsOrderKey = 'cycle' | 'finishedAt'

interface UsePastElectionsProps {
  page?: number
  orderKey: PastElectionsOrderKey
  isDescending: boolean
}

const getOrderBy = (key: PastElectionsOrderKey, isDescending: boolean) => {
  if (key === 'cycle') {
    return isDescending ? ElectionRoundOrderByInput.CycleIdDesc : ElectionRoundOrderByInput.CycleIdAsc
  }

  return isDescending ? ElectionRoundOrderByInput.UpdatedAtDesc : ElectionRoundOrderByInput.UpdatedAtAsc
}

export const usePastElections = ({ page = 1, orderKey, isDescending }: UsePastElectionsProps) => {
  const variables = {
    orderBy: [getOrderBy(orderKey, isDescending)],
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
