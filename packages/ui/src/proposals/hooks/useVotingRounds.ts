import { useMemo } from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { useCouncilSize } from '@/common/hooks/useCouncilSize'
import { Reducer } from '@/common/types/helpers'
import { groupBy, isDefined, last, propsEquals, repeat } from '@/common/utils'
import { ProposalStatusUpdates, ProposalVote } from '@/proposals/types'

export type VoteMap = Map<ProposalVoteKind, ProposalVote[]>

export interface VoteCount {
  total: number
  approve: number
  reject: number
  slash: number
  abstain: number
  remain?: number
}

export interface VotingRound {
  approved: boolean
  map: VoteMap
  count: VoteCount
}

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

export const useVotingRounds = (votes: ProposalVote[] = [], updates: ProposalStatusUpdates[] = []): VotingRound[] => {
  const councilSize = useCouncilSize()

  const voteRounds: (Omit<VotingRound, 'count'> & { total?: number })[] = useMemo(() => {
    if (!updates.length) return []

    const approvedSoFar = last(updates).status !== 'deciding'
    const decidingCount = updates.filter(({ status }) => status === 'deciding').length
    const votesByRound = groupBy(votes, propsEquals('votingRound'))

    const voteRound = (round: number) => ({
      approved: approvedSoFar || round < decidingCount - 1,
      map: (votesByRound[round] || []).reduce(mapVotes, new Map()),
      total: votesByRound[round]?.length,
    })

    return repeat(voteRound, decidingCount)
  }, [votes.length])

  return useMemo(
    () => voteRounds.map(({ total, ...props }) => ({ ...props, count: countVoteMap(props.map, total, councilSize) })),
    [votes.length, councilSize]
  )
}

const mapVotes: Reducer<VoteMap, ProposalVote> = (votesMap, vote) =>
  votesMap.set(vote.voteKind, [...(votesMap.get(vote.voteKind) ?? []), vote])

export const countVoteMap = (voteMap: VoteMap, total = 0, councilSize?: number) => ({
  total,
  approve: voteMap.get(Approve)?.length ?? 0,
  reject: voteMap.get(Reject)?.length ?? 0,
  slash: voteMap.get(Slash)?.length ?? 0,
  abstain: voteMap.get(Abstain)?.length ?? 0,
  remain: isDefined(councilSize) ? councilSize - total : undefined,
})
