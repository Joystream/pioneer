import { renderHook } from '@testing-library/react-hooks'

import { ProposalVotedEvent, ProposalVoteKind } from '@/common/api/queries'
import { useVoteCount } from '@/proposals/hooks/useVoteCount'

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

const asVotes = (voteKinds: ProposalVoteKind[]) => voteKinds.map((voteKind) => ({ voteKind } as ProposalVotedEvent))
const renderUseVoteCount = (voteKinds: ProposalVoteKind[]) =>
  renderHook((voteKinds) => useVoteCount(asVotes(voteKinds)), { initialProps: voteKinds })

const councilSize = 20

jest.mock('../../../src/common/hooks/useCouncilSize', () => ({
  useCouncilSize: () => councilSize,
}))

describe('useProposalVoteCount', () => {
  it('Default', () => {
    const { result, rerender } = renderUseVoteCount([Approve, Reject, Slash, Approve, Abstain])
    expect(result.current).toEqual({
      total: 5,
      approve: 2,
      reject: 1,
      slash: 1,
      abstain: 1,
      remain: councilSize - 5,
    })

    rerender([])
    expect(result.current).toEqual({
      total: 0,
      approve: 0,
      reject: 0,
      slash: 0,
      abstain: 0,
      remain: councilSize,
    })
  })
})
