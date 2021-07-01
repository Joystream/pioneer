import { useMemo } from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { useCouncilSize } from '@/common/hooks/useCouncilSize'
import { Reducer } from '@/common/types/helpers'
import { isDefined } from '@/common/utils'
import { ProposalVote } from '@/proposals/types'

export type VoteMap = Map<ProposalVoteKind, ProposalVote[]>

export interface ProposalVoteCount {
  total: number
  approve: number
  reject: number
  slash: number
  abstain: number
  remain?: number
}

export interface ProposalVotes {
  map: VoteMap
  count: ProposalVoteCount
}

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

export const useProposalVotes = (votes?: ProposalVote[]): ProposalVotes | undefined => {
  const councilSize = useCouncilSize()

  return useMemo(() => {
    const map = votes?.reduce(mapVotes, new Map())

    return map && { count: countVoteMap(map, votes?.length, councilSize), map }
  }, [votes?.length, councilSize])
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
