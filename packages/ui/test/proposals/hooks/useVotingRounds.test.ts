import { renderHook } from '@testing-library/react-hooks'

import { ProposalVoteKind } from '@/common/api/queries'
import { useCouncilSize } from '@/council/hooks/useCouncilSize'
import { getMember } from '@/mocks/helpers'
import { randomBlock } from '@/mocks/helpers/randomBlock'
import { useVotingRounds } from '@/proposals/hooks/useVotingRounds'
import { ProposalStatus } from '@/proposals/types'

type VoteData = [ProposalVoteKind, number]
const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

const asVote = ([voteKind, votingRound]: VoteData) => ({ id: '0', voteKind, votingRound, voter: getMember('alice') })
const asVotes = (data: VoteData[]) => data.map(asVote)

const renderUseProposalVotes = (voteData: VoteData[], statusUpdates: ProposalStatus[]) =>
  renderHook(
    ([voteData, statuses]: [VoteData[], ProposalStatus[]]) => {
      const votes = asVotes(voteData)
      const updates = statuses.map((status) => ({ status, inBlock: randomBlock() }))
      return useVotingRounds(votes, updates)
    },
    { initialProps: [voteData, statusUpdates] }
  )

const councilSize = 3

jest.mock('@/council/hooks/useCouncilSize', () => ({
  useCouncilSize: jest.fn(() => councilSize),
}))

const mockedUseCouncilSize = useCouncilSize as jest.Mock

describe('useVotingRounds', () => {
  beforeEach(() => {
    mockedUseCouncilSize.mockClear()
  })

  it('Default', () => {
    const { result, rerender } = renderUseProposalVotes(
      [
        [Approve, 1],
        [Reject, 1],
        [Approve, 1],
        [Slash, 2],
        [Abstain, 2],
      ],
      ['dormant', 'deciding']
    )

    expect(result.current).toEqual([
      {
        map: new Map([
          [Approve, [asVote([Approve, 1]), asVote([Approve, 1])]],
          [Reject, [asVote([Reject, 1])]],
        ]),
        count: {
          total: 3,
          approve: 2,
          reject: 1,
          slash: 0,
          abstain: 0,
          remain: councilSize - 3,
        },
      },
      {
        map: new Map([
          [Abstain, [asVote([Abstain, 2])]],
          [Slash, [asVote([Slash, 2])]],
        ]),
        count: {
          total: 2,
          approve: 0,
          reject: 0,
          slash: 1,
          abstain: 1,
          remain: councilSize - 2,
        },
      },
    ])

    rerender([[], []])

    expect(result.current).toEqual([
      {
        map: new Map(),
        count: {
          total: 0,
          approve: 0,
          reject: 0,
          slash: 0,
          abstain: 0,
          remain: councilSize,
        },
      },
    ])
  })

  it('No votes in newest round', () => {
    const { result } = renderUseProposalVotes(
      [
        [Approve, 1],
        [Approve, 1],
        [Approve, 1],
      ],
      ['dormant', 'deciding']
    )

    expect(result.current).toEqual([
      {
        map: new Map([[Approve, [asVote([Approve, 1]), asVote([Approve, 1]), asVote([Approve, 1])]]]),
        count: {
          total: 3,
          approve: 3,
          reject: 0,
          slash: 0,
          abstain: 0,
          remain: 0,
        },
      },
      {
        map: new Map([]),
        count: {
          total: 0,
          approve: 0,
          reject: 0,
          slash: 0,
          abstain: 0,
          remain: councilSize,
        },
      },
    ])
  })

  it('Votes seeded in reversed order', () => {
    const { result } = renderUseProposalVotes(
      [
        [Approve, 2],
        [Reject, 2],
        [Approve, 2],
        [Slash, 1],
        [Abstain, 1],
      ],
      ['dormant', 'deciding']
    )

    expect(result.current).toEqual([
      {
        map: new Map([
          [Abstain, [asVote([Abstain, 1])]],
          [Slash, [asVote([Slash, 1])]],
        ]),
        count: {
          total: 2,
          approve: 0,
          reject: 0,
          slash: 1,
          abstain: 1,
          remain: councilSize - 2,
        },
      },
      {
        map: new Map([
          [Approve, [asVote([Approve, 2]), asVote([Approve, 2])]],
          [Reject, [asVote([Reject, 2])]],
        ]),
        count: {
          total: 3,
          approve: 2,
          reject: 1,
          slash: 0,
          abstain: 0,
          remain: councilSize - 3,
        },
      },
    ])
  })

  it('Unknown council size', () => {
    mockedUseCouncilSize.mockReturnValue(undefined)

    const { result } = renderUseProposalVotes(
      [
        [Approve, 0],
        [Reject, 0],
        [Slash, 0],
        [Approve, 0],
        [Abstain, 0],
      ],
      []
    )

    expect(result.current).toEqual([
      {
        map: new Map([
          [Approve, [asVote([Approve, 0]), asVote([Approve, 0])]],
          [Reject, [asVote([Reject, 0])]],
          [Slash, [asVote([Slash, 0])]],
          [Abstain, [asVote([Abstain, 0])]],
        ]),
        count: {
          total: 5,
          approve: 2,
          reject: 1,
          slash: 1,
          abstain: 1,
          remain: undefined,
        },
      },
    ])
  })
})
