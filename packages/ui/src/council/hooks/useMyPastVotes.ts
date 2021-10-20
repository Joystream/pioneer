import { useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { isDefined } from '@/common/utils'

import { useGetCouncilVotesLazyQuery } from '../queries'
import { asVote } from '../types/Vote'

import { useCurrentElection } from './useCurrentElection'

export const useMyPastVotes = () => {
  const { allAccounts } = useMyAccounts()
  const { isLoading: electionLoading, election } = useCurrentElection()
  const [fetch, { data, loading }] = useGetCouncilVotesLazyQuery()
  useEffect(() => {
    if (isDefined(election)) {
      fetch({
        variables: {
          where: {
            castBy_in: allAccounts.map((account) => account.address),
            electionRound: { isFinished_eq: true },
          },
        },
      })
    }
  }, [election?.cycleId])
  return {
    votes: data?.castVotes.map(asVote),
    isLoading: loading || electionLoading,
  }
}
