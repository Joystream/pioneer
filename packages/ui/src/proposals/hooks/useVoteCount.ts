import { useMemo } from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { useCouncilSize } from '@/common/hooks/useCouncilSize'
import { Reducer } from '@/common/types/helpers'
import { isDefined } from '@/common/utils'
import { VoteFieldsFragment } from '@/proposals/queries'

export interface VoteCount {
  total: number
  approve: number
  reject: number
  slash: number
  abstain: number
  remain?: number
}

export const useVoteCount = (votes?: VoteFieldsFragment[]): VoteCount | undefined => {
  const councilSize = useCouncilSize()

  return useMemo(() => {
    const count = votes?.reduce(VoteCounting, [0, 0, 0, 0])

    if (!votes || !count) {
      return
    }

    const total = votes.length
    const remain = isDefined(councilSize) ? councilSize - total : undefined
    const [approve, reject, slash, abstain] = count
    return { total, approve, reject, slash, abstain, remain }
  }, [votes?.length, councilSize])
}

const VoteCounting: Reducer<[number, number, number, number], VoteFieldsFragment> = (
  [approve, reject, slash, abstain],
  { voteKind }
) => [
  approve + Number(voteKind === ProposalVoteKind.Approve),
  reject + Number(voteKind === ProposalVoteKind.Reject),
  slash + Number(voteKind === ProposalVoteKind.Slash),
  abstain + Number(voteKind === ProposalVoteKind.Abstain),
]
