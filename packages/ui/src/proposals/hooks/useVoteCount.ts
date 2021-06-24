import { useMemo } from 'react'

import { ProposalVotedEvent, ProposalVoteKind } from '@/common/api/queries'
import { useCouncilSize } from '@/common/hooks/useCouncilSize'
import { Reducer } from '@/common/types/helpers'

export interface VoteCount {
  total: number
  approve: number
  reject: number
  slash: number
  abstain: number
  remain: number
}

export const useVoteCount = (votes?: ProposalVotedEvent[]): VoteCount | undefined => {
  const councilSize = useCouncilSize()

  const count = useMemo(() => votes?.reduce(VoteCounting, [0, 0, 0, 0]), [votes?.length])

  if (!councilSize || !votes || !count) {
    return
  }

  const total = votes.length
  const remain = councilSize - total
  const [approve, reject, slash, abstain] = count
  return { total, approve, reject, slash, abstain, remain }
}

const VoteCounting: Reducer<[number, number, number, number], ProposalVotedEvent> = (
  [approve, reject, slash, abstain],
  { voteKind }
) => [
  approve + Number(voteKind === ProposalVoteKind.Approve),
  reject + Number(voteKind === ProposalVoteKind.Reject),
  slash + Number(voteKind === ProposalVoteKind.Slash),
  abstain + Number(voteKind === ProposalVoteKind.Abstain),
]
