import { useMemo } from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { Reducer } from '@/common/types/helpers'
import { groupBy, isDefined, propsEquals, repeat } from '@/common/utils'
import { useCouncilSize } from '@/council/hooks/useCouncilSize'
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
  map: VoteMap
  count: VoteCount
}

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

export const useVotingRounds = (votes: ProposalVote[] = [], updates: ProposalStatusUpdates[] = []): VotingRound[] => {
  const councilSize = useCouncilSize()

  const voteRounds: (Omit<VotingRound, 'count'> & { total?: number })[] = useMemo(() => {
    const decidingCount = updates.filter(({ status }) => status === 'deciding').length + 1
    const votesByRound = groupBy(votes, propsEquals('votingRound')).sort((a, b) => a[0].votingRound - b[0].votingRound)

    const voteRound = (round: number) => ({
      map: (votesByRound[round] || []).reduce(mapVotes, new Map()),
      total: votesByRound[round]?.length,
    })

    return repeat(voteRound, decidingCount)
  }, [votes.length, updates.length])

  return useMemo(
    () => voteRounds.map(({ total, ...props }) => ({ ...props, count: countVoteMap(props.map, total, councilSize) })),
    [votes.length, updates.length, councilSize]
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
