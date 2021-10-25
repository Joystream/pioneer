import { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'

import { useGetCouncilVotesCountQuery, useGetPastVotesResultsQuery } from '../queries'

export const useMyPastVotesStats = () => {
  const { allAccounts } = useMyAccounts()
  const { data: totalVotesData, loading: loadingVotesData } = useGetCouncilVotesCountQuery({
    variables: {
      where: { castBy_in: allAccounts.map((account) => account.address), electionRound: { isFinished_eq: true } },
    },
  })
  const { data: pastResultsData, loading: loadingResultsData } = useGetPastVotesResultsQuery({
    variables: { myAccounts: allAccounts.map((account) => account.address) },
  })
  const votesForWinners = useMemo(() => {
    const winnersByElection = new Map<string, string[]>()
    pastResultsData?.electionRounds.forEach((round) =>
      winnersByElection.set(
        round.id,
        round.electedCouncil.councilMembers.map((member) => member.member.id)
      )
    )
    const count = pastResultsData?.castVotes.reduce(
      (total, vote) =>
        vote.voteFor && winnersByElection.get(vote.electionRound.id)?.includes(vote.voteFor?.id) ? total + 1 : total,
      0
    )
    return count
  }, [pastResultsData?.castVotes.length, pastResultsData?.electionRounds.length])
  return {
    votesTotal: totalVotesData?.castVotesConnection.totalCount,
    votesForWinners,
    isLoading: loadingVotesData || loadingResultsData,
  }
}
