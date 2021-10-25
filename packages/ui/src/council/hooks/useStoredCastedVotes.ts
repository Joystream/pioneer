import { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { calculateCommitment } from '@/council/model/calculateCommitment'
import { useGetCouncilVotesCommitmentsLazyQuery } from '@/council/queries'

import { VotingAttempt } from './useCommitment'

export const useStoredCastedVotes = (cycleId?: number) => {
  const [get, { data }] = useGetCouncilVotesCommitmentsLazyQuery()

  const [votingAttempts] = useLocalStorage<VotingAttempt[]>(`votes:${cycleId}`)
  const { allAccounts } = useMyAccounts()
  const myAttempts = useMemo(() => {
    if (!cycleId || !allAccounts.length) return

    const addresses = allAccounts.map((account) => account.address)
    return votingAttempts
      ?.filter(({ accountId }) => addresses.includes(accountId))
      .map(({ salt, accountId, optionId }) => ({
        salt,
        accountId,
        optionId,
        commitment: calculateCommitment(accountId, optionId, salt, cycleId),
      }))
  }, [votingAttempts?.length, allAccounts.length])

  useEffect(() => {
    if (!myAttempts?.length) return
    get({
      variables: {
        where: {
          commitment_in: myAttempts.map(({ commitment }) => commitment),
          electionRound: { cycleId_eq: cycleId },
        },
      },
    })
  }, [myAttempts?.length])

  return useMemo(() => {
    if (!myAttempts) {
      return
    } else if (myAttempts.length === 0) {
      return []
    } else if (data) {
      const castedCommitment = data.castVotes.map(({ commitment }) => commitment)
      return myAttempts.filter(({ commitment }) => castedCommitment.includes(commitment))
    }
  }, [myAttempts?.length, data?.castVotes.length])
}
