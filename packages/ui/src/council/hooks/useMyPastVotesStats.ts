import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'

import { useGetCouncilVotesCountQuery } from '../queries'

export const useMyPastVotesStats = () => {
  const { allAccounts } = useMyAccounts()
  const { data } = useGetCouncilVotesCountQuery({
    variables: {
      where: { castBy_in: allAccounts.map((account) => account.address), electionRound: { isFinished_eq: true } },
    },
  })
  return {
    votesTotal: data?.castVotesConnection.totalCount,
  }
}
