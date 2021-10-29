import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'

import { useGetCouncilVotesCountQuery } from '../queries'

export const useMyCurrentVotesCount = (electionCycleId?: number) => {
  const { allAccounts } = useMyAccounts()
  const { data: totalVotesData, loading: loadingVotesData } = useGetCouncilVotesCountQuery({
    variables: {
      where: {
        castBy_in: allAccounts.map((account) => account.address),
        electionRound: { cycleId_eq: electionCycleId },
      },
    },
  })
  return {
    votesTotal: totalVotesData?.castVotesConnection.totalCount,
    isLoading: loadingVotesData,
  }
}
