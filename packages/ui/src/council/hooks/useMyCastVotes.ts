import { useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { isDefined } from '@/common/utils'
import { useGetCouncilVotesLazyQuery } from '@/council/queries'
import { asVote } from '@/council/types'

export const useMyCastVotes = (cycleId?: number) => {
  const { allAccounts } = useMyAccounts()
  const [getVotes, { data, loading }] = useGetCouncilVotesLazyQuery()

  useEffect(() => {
    if (isDefined(cycleId)) {
      getVotes({
        variables: {
          where: {
            castBy_in: allAccounts.map(({ address }) => address),
            electionRound: { cycleId_eq: cycleId },
          },
        },
      })
    }
  }, [cycleId])

  return { votes: data?.castVotes.map(asVote), isLoading: loading }
}
