import { renderHook } from '@testing-library/react-hooks'

import { ProposalVoteKind } from '@/common/api/queries'
import { useCouncilSize } from '@/common/hooks/useCouncilSize'
import { useProposalVotes } from '@/proposals/hooks/useProposalVotes'
import { asProposalVote } from '@/proposals/types'

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

const asVotes = (voteKinds: ProposalVoteKind[]) => voteKinds.map((voteKind) => asProposalVote({ voteKind, id: '1' }))

const renderUseProposalVotes = (voteKinds: ProposalVoteKind[]) =>
  renderHook((voteKinds) => useProposalVotes(asVotes(voteKinds)), { initialProps: voteKinds })

const councilSize = 20

jest.mock('../../../src/common/hooks/useCouncilSize', () => ({
  useCouncilSize: jest.fn(() => councilSize),
}))

const mockedUseCouncilSize = useCouncilSize as jest.Mock

describe('useProposalVotes', () => {
  beforeEach(() => {
    mockedUseCouncilSize.mockClear()
  })

  it('Default', () => {
    const { result, rerender } = renderUseProposalVotes([Approve, Reject, Slash, Approve, Abstain])

    expect(result.current).toEqual({
      map: new Map([
        [Approve, [asProposalVote({ voteKind: Approve, id: '1' }), asProposalVote({ voteKind: Approve, id: '1' })]],
        [Reject, [asProposalVote({ voteKind: Reject, id: '1' })]],
        [Slash, [asProposalVote({ voteKind: Slash, id: '1' })]],
        [Abstain, [asProposalVote({ voteKind: Abstain, id: '1' })]],
      ]),

      count: {
        total: 5,
        approve: 2,
        reject: 1,
        slash: 1,
        abstain: 1,
        remain: councilSize - 5,
      },
    })

    rerender([])

    expect(result.current).toEqual({
      map: new Map(),
      count: {
        total: 0,
        approve: 0,
        reject: 0,
        slash: 0,
        abstain: 0,
        remain: councilSize,
      },
    })
  })

  it('Unknown council size', () => {
    mockedUseCouncilSize.mockReturnValue(undefined)

    const { result } = renderUseProposalVotes([Approve, Reject, Slash, Approve, Abstain])

    expect(result.current).toEqual({
      map: new Map([
        [Approve, [asProposalVote({ id: '1', voteKind: Approve }), asProposalVote({ id: '1', voteKind: Approve })]],
        [Reject, [asProposalVote({ id: '1', voteKind: Reject })]],
        [Slash, [asProposalVote({ id: '1', voteKind: Slash })]],
        [Abstain, [asProposalVote({ id: '1', voteKind: Abstain })]],
      ]),

      count: {
        total: 5,
        approve: 2,
        reject: 1,
        slash: 1,
        abstain: 1,
        remain: undefined,
      },
    })
  })
})
