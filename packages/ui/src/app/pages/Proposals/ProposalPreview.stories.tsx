import { expect } from '@storybook/jest'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { random } from 'faker'
import { last } from 'lodash'
import { FC } from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { RecursivePartial } from '@/common/types/helpers'
import { repeat } from '@/common/utils'
import { GetElectedCouncilDocument } from '@/council/queries'
import { member } from '@/mocks/data/members'
import {
  ProposalStatus,
  proposalDiscussionPosts,
  proposalActiveStatus,
  proposalDetailsMap,
} from '@/mocks/data/proposals'
import { getButtonByText, getEditorByLabel, withinModal, isoDate, joy } from '@/mocks/helpers'
import { ProposalDetailsType, proposalDetailsToConstantKey } from '@/mocks/helpers/proposalDetailsToConstantKey'
import { MocksParameters } from '@/mocks/providers'
import { GetProposalDocument, ProposalWithDetailsFieldsFragment } from '@/proposals/queries'

import { ProposalPreview } from './ProposalPreview'

import { randomMarkdown } from '@/../dev/query-node-mocks/generators/utils'

const bob = member('bob', { isCouncilMember: true })
const charlie = member('charlie', { isCouncilMember: true })

const PROPOSAL_DATA = {
  id: '0',
  title: random.words(4),
  description: randomMarkdown(),
}

const voteArgs = ['None', 'Approve', 'Reject', 'Slash', 'Abstain'] as const
type VoteArg = (typeof voteArgs)[number]
const asVoteKind = (vote?: VoteArg): ProposalVoteKind | undefined =>
  vote === 'None' ? undefined : vote && ProposalVoteKind[vote]

type Args = {
  isCouncilMember: boolean
  isProposer: boolean
  isDiscussionOpen: boolean
  isInDiscussionWhitelist: boolean
  type: ProposalDetailsType
  constitutionality: number
  vote1: VoteArg
  vote2: VoteArg
  vote3: VoteArg
  onVote: CallableFunction
}
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Proposals/ProposalPreview',
  component: ProposalPreview,

  argTypes: {
    type: { control: { type: 'select' }, options: Object.keys(proposalDetailsMap) },
    constitutionality: { control: { type: 'range', min: 1, max: 4 } },
    vote1: { control: { type: 'inline-radio' }, options: voteArgs },
    vote2: { control: { type: 'inline-radio' }, options: voteArgs },
    vote3: { control: { type: 'inline-radio' }, options: voteArgs },
    onVote: { action: 'Voted' },
  },

  args: {
    isCouncilMember: false,
    isProposer: false,
    isInDiscussionWhitelist: false,
    isDiscussionOpen: true,
    type: 'SignalProposalDetails',
    constitutionality: 1,
    vote1: 'None',
    vote2: 'None',
    vote3: 'None',
  },

  parameters: {
    router: { path: '/:id', href: '/0' },

    statuses: ['ProposalStatusDeciding'] satisfies ProposalStatus[],
    totalBalance: 100,

    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const { constitutionality, isCouncilMember } = args

      const alice = member('alice', { isCouncilMember })
      const dave = member('dave', { isCouncilMember: !isCouncilMember })

      const status = last(parameters.statuses) as ProposalStatus
      const updates = parameters.statuses.slice(1, proposalActiveStatus.includes(status) ? undefined : -1)
      const councilors = [isCouncilMember ? alice : dave, bob, charlie]

      const paramVotes = parameters.votes as VoteArg[][] | undefined
      const votesRounds = paramVotes ?? repeat(() => [args.vote1, args.vote2, args.vote3], constitutionality)
      const votes = votesRounds.flatMap((votes, round) =>
        votes.flatMap((vote, index) =>
          vote === 'None' ? [] : { voteKind: asVoteKind(vote), voter: councilors[index], votingRound: round + 1 }
        )
      )

      return {
        accounts: { active: { member: alice, balances: parameters.totalBalance } },

        chain: {
          consts: {
            proposalsCodex: {
              [proposalDetailsToConstantKey(args.type)]: {
                votingPeriod: 200,
                gracePeriod: 100,
                approvalQuorumPercentage: 80,
                approvalThresholdPercentage: 100,
                slashingQuorumPercentage: 60,
                slashingThresholdPercentage: 80,
                requiredStake: joy(200),
                constitutionality,
              },
            },
            council: { councilSize: 3, idlePeriodDuration: 1, announcingPeriodDuration: 1 },
            referendum: { voteStageDuration: 1, revealStageDuration: 1 },
          },

          query: {
            members: { membershipPrice: joy(5) },
            council: {
              budget: joy(1000),
              councilorReward: joy(1),
              stage: { stage: { isIdle: true }, changedAt: 123 },
            },
            referendum: { stage: {} },
          },

          tx: {
            proposalsEngine: { vote: { event: 'Voted', onSend: args.onVote } },
          },
        },

        queryNode: [
          {
            query: GetProposalDocument,
            data: {
              proposal: {
                id: PROPOSAL_DATA.id,
                title: PROPOSAL_DATA.title,
                description: PROPOSAL_DATA.description,
                discussionThread: {
                  posts: proposalDiscussionPosts,
                  mode: args.isDiscussionOpen
                    ? { __typename: 'ProposalDiscussionThreadModeOpen' }
                    : {
                        __typename: 'ProposalDiscussionThreadModeClosed',
                        whitelist: {
                          __typename: 'ProposalDiscussionWhitelist',
                          members: args.isInDiscussionWhitelist ? [alice] : [],
                        },
                      },
                },

                creator: args.isProposer ? alice : bob,
                details: proposalDetailsMap[args.type],

                createdInEvent: { inBlock: 123, createdAt: isoDate('2023/01/02') },
                proposalStatusUpdates: updates.map((status: ProposalStatus) => ({
                  inBlock: 123,
                  createdAt: isoDate('2023/01/02'),
                  newStatus: { __typename: status },
                })),
                status: { __typename: status },
                statusSetAtBlock: 123,
                statusSetAtTime: isoDate('2023/01/12'),

                councilApprovals: parameters.councilApprovals ?? constitutionality - 1,
                votes,
              } as RecursivePartial<ProposalWithDetailsFieldsFragment>,
            },
          },

          {
            query: GetElectedCouncilDocument,
            data: {
              electedCouncils: {
                id: '0',
                electedAtBlock: 123,
                electedAtTime: isoDate('2023/01/02'),
                councilElections: [{ cycleId: 4 }],
                councilMembers: [
                  { id: '0', unpaidReward: '0', stake: joy(200), member: councilors[0] },
                  { id: '1', unpaidReward: '0', stake: joy(200), member: councilors[1] },
                  { id: '2', unpaidReward: '0', stake: joy(200), member: councilors[2] },
                ],
              },
            },
          },
        ],
      }
    },
  },
} satisfies Meta<Args>

// ----------------------------------------------------------------------------
// ProposalPreview
// ----------------------------------------------------------------------------

export const AmendConstitution: Story = {
  args: { type: 'AmendConstitutionProposalDetails', constitutionality: 2 },
  parameters: {
    statuses: ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusDeciding'] satisfies ProposalStatus[],
  },
}
export const CancelWorkingGroupLeadOpening: Story = {
  args: { type: 'CancelWorkingGroupLeadOpeningProposalDetails' },
}
export const CreateWorkingGroupLeadOpening: Story = {
  args: { type: 'CreateWorkingGroupLeadOpeningProposalDetails' },
}
export const DecreaseWorkingGroupLeadStake: Story = {
  args: { type: 'DecreaseWorkingGroupLeadStakeProposalDetails' },
}
export const FillWorkingGroupLeadOpening: Story = {
  args: { type: 'FillWorkingGroupLeadOpeningProposalDetails' },
}
export const FundingRequest: Story = {
  args: { type: 'FundingRequestProposalDetails' },
}
export const RuntimeUpgrade: Story = {
  args: { type: 'RuntimeUpgradeProposalDetails', constitutionality: 2 },
  parameters: {
    statuses: ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusDeciding'] satisfies ProposalStatus[],
  },
}
export const SetCouncilBudgetIncrement: Story = {
  args: { type: 'SetCouncilBudgetIncrementProposalDetails', constitutionality: 2 },
  parameters: {
    statuses: ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusDeciding'] satisfies ProposalStatus[],
  },
}
export const SetCouncilorReward: Story = {
  args: { type: 'SetCouncilorRewardProposalDetails', constitutionality: 2 },
  parameters: {
    statuses: ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusDeciding'] satisfies ProposalStatus[],
  },
}
export const SetInitialInvitationBalance: Story = {
  args: { type: 'SetInitialInvitationBalanceProposalDetails' },
}
export const SetInitialInvitationCount: Story = {
  args: { type: 'SetInitialInvitationCountProposalDetails' },
}
export const SetMaxValidatorCount: Story = {
  args: { type: 'SetMaxValidatorCountProposalDetails', constitutionality: 2 },
  parameters: {
    statuses: ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusDeciding'] satisfies ProposalStatus[],
  },
}
export const SetMembershipLeadInvitationQuota: Story = {
  args: { type: 'SetMembershipLeadInvitationQuotaProposalDetails' },
}
export const SetMembershipPrice: Story = {
  args: { type: 'SetMembershipPriceProposalDetails' },
}
export const SetReferralCut: Story = {
  args: { type: 'SetReferralCutProposalDetails' },
}
export const SetWorkingGroupLeadReward: Story = {
  args: { type: 'SetWorkingGroupLeadRewardProposalDetails' },
}
export const Signal: Story = {
  args: { type: 'SignalProposalDetails' },
}
export const SlashWorkingGroupLead: Story = {
  args: { type: 'SlashWorkingGroupLeadProposalDetails' },
}
export const TerminateWorkingGroupLead: Story = {
  args: { type: 'TerminateWorkingGroupLeadProposalDetails' },
}
export const UpdateChannelPayouts: Story = {
  args: { type: 'UpdateChannelPayoutsProposalDetails' },
}
export const UpdateWorkingGroupBudget: Story = {
  args: { type: 'UpdateWorkingGroupBudgetProposalDetails' },
}
export const Veto: Story = {
  args: { type: 'VetoProposalDetails' },
}

// ----------------------------------------------------------------------------
// VoteForProposalModal
// ----------------------------------------------------------------------------

export const VoteForProposalModal: Story = {
  args: { type: 'SignalProposalDetails', isCouncilMember: true },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByText('Vote on Proposal'))
  },
}

// ----------------------------------------------------------------------------
// Test ProposalPreview
// ----------------------------------------------------------------------------

export const TestsIsNotCouncil: Story = {
  args: { type: 'SetMaxValidatorCountProposalDetails', constitutionality: 2, isCouncilMember: false, isProposer: true },

  name: 'Test ProposalPreview > Is not in council',
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)

    await step('Main', () => {
      expect(screen.getByText(PROPOSAL_DATA.title, { selector: 'header h2' })).toBeDefined()

      expect(screen.getByText('Deciding', { selector: 'header *' })).toBeDefined()

      expect(screen.getAllByText(/(?:Approval|Slashing) (?:Quorum|Threshold)/)).toHaveLength(4)

      expect(screen.getByText('Set Max Validator Count')).toBeDefined()

      expect(screen.getByText('Rationale')).toBeDefined()

      expect(screen.getByText('Discussion')).toBeDefined()
    })

    await step('Header', () => {
      expect(screen.getByText('Round 1')).toBeVisible()
      expect(screen.getByText('Round 2')).toBeVisible()
    })

    await step('Sidebar', () => {
      const sideBarElement = screen.getByRole('complementary')
      expect(sideBarElement).toBeDefined()

      const sideBar = within(sideBarElement)
      const proposerSection = within(sideBar.getByText('Proposer').parentElement as HTMLElement)
      expect(proposerSection.getByText('alice')).toBeDefined()

      expect(sideBar.getByText('History')).toBeDefined()

      for (const name of ['Approved', 'Rejected', 'Slashed', 'Abstained', 'Not Voted']) {
        expect(sideBar.getByText(name)).toBeDefined()
      }
    })

    await step('Member is not a council member', () => {
      expect(screen.queryByText(/Vote on Proposal/i)).toBeNull()
      expect(screen.queryByText(/Already voted/i)).toBeNull()
    })
  },
}

export const TestsHasNotVoted: Story = {
  args: { type: 'SetMaxValidatorCountProposalDetails', constitutionality: 2, isCouncilMember: true, isProposer: true },

  name: 'Test ProposalPreview > Has not voted',
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    expect(screen.queryByText(/You voted for:/i)).toBeNull()
  },
}

export const TestsHasVotedInCurrentRound: Story = {
  args: { type: 'SetMaxValidatorCountProposalDetails', constitutionality: 2, isCouncilMember: true, isProposer: true },
  parameters: {
    statuses: ['ProposalStatusDeciding'] satisfies ProposalStatus[],
    councilApprovals: 0,
    votes: [['Reject', 'Approve', 'Approve']] satisfies VoteArg[][],
  },

  name: 'Test ProposalPreview > Has voted in the current round',
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText(/Already voted/i)).toBeDefined()
    expect(screen.getByText(/You voted for:/i)).toHaveTextContent('You voted for: Rejected')
  },
}

export const TestsHasNotVotedInCurrentRound: Story = {
  args: { type: 'SetMaxValidatorCountProposalDetails', constitutionality: 2, isCouncilMember: true, isProposer: true },
  parameters: {
    statuses: ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusDeciding'] satisfies ProposalStatus[],
    votes: [
      ['Approve', 'Approve', 'Approve'],
      ['None', 'Reject', 'Slash'],
    ] satisfies VoteArg[][],
  },

  name: 'Test ProposalPreview > Not voted in the current round',
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)

    expect(screen.getByText(/Vote on Proposal/i)).toBeDefined()
    expect(screen.queryByText(/You voted for:/i)).toBeNull()
    await userEvent.click(screen.getByText('Round 1'))
    expect(screen.getByText(/You voted for:/i)).toHaveTextContent('You voted for: Approved')
  },
}

// ----------------------------------------------------------------------------
// VoteForProposalModal
// ----------------------------------------------------------------------------

export const TestVoteForProposalModal: Story = {
  args: { type: 'SignalProposalDetails', isCouncilMember: true },

  name: 'Test VoteForProposalModal',
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await userEvent.click(screen.getByText('Vote on Proposal'))

    await step('Render', async () => {
      await modal.findByText(/Vote for proposal/i)
      modal.getByText(PROPOSAL_DATA.title)
    })

    const getButton = (text: string | RegExp) => getButtonByText(modal, text)

    await step('Form > Empty', () => {
      expect(getButton(/^sign transaction and vote/i)).toBeDisabled()
      getButton(/^Reject/i)
      getButton(/^Approve/i)
      getButton(/^Abstain/i)
    })

    const rationaleEditor = await getEditorByLabel(modal, /Rationale/i)

    await step('No vote type selected', async () => {
      rationaleEditor.setData('Some rationale')
      expect(getButton(/^sign transaction and vote/i)).toBeDisabled()
    })

    await step('Form > No rationale', async () => {
      rationaleEditor.setData('')
      await userEvent.click(getButton(/^Approve/i))
      expect(getButton(/^sign transaction and vote/i)).toBeDisabled()
    })

    await step('Form > Filled', async () => {
      rationaleEditor.setData('Some rationale')
      expect(getButton(/^sign transaction and vote/i)).not.toBeDisabled()
    })
  },
}

// TODO: Test Requirements verification
