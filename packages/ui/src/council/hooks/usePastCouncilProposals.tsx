import { useGetCouncilBlockRangeQuery, useGetCouncilProposalsStatsQuery } from '@/council/queries'

export const usePastCouncilProposals = (id: string) => {
  const { loading: loadingRange, data: rangeData } = useGetCouncilBlockRangeQuery({
    variables: {
      where: {
        id,
      },
    },
  })

  const council = rangeData?.electedCouncilByUniqueInput

  const { loading: loadingData, data } = useGetCouncilProposalsStatsQuery({
    variables: {
      startBlock: council?.electedAtBlock ?? 0,
      endBlock: council?.endedAtBlock ?? 0,
    },
  })

  return {
    isLoading: loadingRange || loadingData,
    approved: data?.approved?.totalCount ?? 0,
    rejected: data?.rejected?.totalCount ?? 0,
    slashed: data?.slashed?.totalCount ?? 0,
  }
}
