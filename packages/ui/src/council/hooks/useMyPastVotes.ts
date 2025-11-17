import { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { CastVoteOrderByInput } from '@/common/api/queries'
import { sortBy, SortOrder } from '@/common/hooks/useSort'

import { useGetCouncilVotesQuery } from '../queries'
import { asVote, Vote } from '../types/Vote'

interface UseMyPastVotesProps {
  order: SortOrder<CastVoteOrderByInput>
}

export const useMyPastVotes = ({ order }: UseMyPastVotesProps) => {
  const { allAccounts } = useMyAccounts()

  const addresses = useMemo(() => allAccounts.map((account) => account.address), [allAccounts])

  const variables = useMemo(() => {
    if (!addresses.length) return undefined

    return {
      where: {
        castBy_in: addresses,
        electionRound: { isFinished_eq: true },
      },
      orderBy: [CastVoteOrderByInput.CreatedAtDesc],
      limit: addresses.length,
    }
  }, [addresses])

  const { data, loading } = useGetCouncilVotesQuery({
    variables,
    skip: !variables,
  })

  const votes = useMemo(() => {
    if (!data?.castVotes) return []

    const seenAccounts = new Set<string>()
    const latestVotes = data.castVotes.filter((vote) => {
      if (seenAccounts.has(vote.castBy)) return false
      seenAccounts.add(vote.castBy)
      return true
    })

    const parsedVotes = latestVotes.map(asVote)

    return sortBy(parsedVotes, order, compareVote)
  }, [data?.castVotes, order])

  return {
    votes,
    isLoading: loading,
  }
}

const compareVote = (first: Vote, second: Vote, key: string) => {
  switch (key) {
    case 'stake':
      return first.stake.cmp(second.stake)
    case 'castBy':
      return first.castBy.localeCompare(second.castBy)
    case 'stakeLocked':
      return Number(first.stakeLocked) - Number(second.stakeLocked)
    case 'createdAt':
    default: {
      const firstTime = Date.parse(first.createdAtBlock?.timestamp ?? '0')
      const secondTime = Date.parse(second.createdAtBlock?.timestamp ?? '0')
      return firstTime - secondTime
    }
  }
}
