import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { random } from 'faker'
import { last, mapValues } from 'lodash'

import { GetElectedCouncilDocument } from '@/council/queries'
import { worker, workingGroup, workingGroupOpening } from '@/mocks/data/common'
import { member } from '@/mocks/data/members'
import { ProposalStatus, proposalDiscussionPosts, proposalActiveStatus } from '@/mocks/data/proposals'
import { isoDate, joy } from '@/mocks/helpers'
import { ProposalDetailsType, proposalDetailsToConstantKey } from '@/mocks/helpers/proposalDetailsToConstantKey'
import { MocksParameters } from '@/mocks/providers'
import { GetProposalDocument } from '@/proposals/queries'

import { ProposalPreview } from './ProposalPreview'

import { randomMarkdown } from '@/../dev/query-node-mocks/generators/utils'

const bob = member('bob', { isCouncilMember: true })
const charlie = member('charlie', { isCouncilMember: true })

const title = random.words(4)
const description = randomMarkdown()

const details = {
  AmendConstitutionProposalDetails: {},
  CancelWorkingGroupLeadOpeningProposalDetails: { opening: workingGroupOpening },
  CreateWorkingGroupLeadOpeningProposalDetails: {
    stakeAmount: joy(200),
    unstakingPeriod: 3400,
    rewardPerBlock: joy(200),
    metadata: { __typename: 'WorkingGroupOpeningMetadata', description: randomMarkdown() },
    group: workingGroup,
  },
  DecreaseWorkingGroupLeadStakeProposalDetails: { amount: joy(200), lead: worker },
  FillWorkingGroupLeadOpeningProposalDetails: {
    opening: workingGroupOpening,
    application: { __typename: 'WorkingGroupApplication', applicant: bob },
  },
  FundingRequestProposalDetails: {
    destinationsList: {
      __typename: 'FundingRequestDestinationsList',
      destinations: [{ __typename: 'FundingRequestDestination', amount: joy(200), account: bob.rootAccount }],
    },
  },
  RuntimeUpgradeProposalDetails: { newRuntimeBytecode: { __typename: 'RuntimeWasmBytecode', id: '0' } },
  SetCouncilBudgetIncrementProposalDetails: { newAmount: joy(200) },
  SetCouncilorRewardProposalDetails: { newRewardPerBlock: joy(200) },
  SetInitialInvitationBalanceProposalDetails: { newInitialInvitationBalance: joy(200) },
  SetInitialInvitationCountProposalDetails: { newInitialInvitationsCount: 100 },
  SetMaxValidatorCountProposalDetails: { newMaxValidatorCount: 100 },
  SetMembershipLeadInvitationQuotaProposalDetails: { newLeadInvitationQuota: 100 },
  SetMembershipPriceProposalDetails: { newPrice: joy(200) },
  SetReferralCutProposalDetails: { newReferralCut: 100 },
  SetWorkingGroupLeadRewardProposalDetails: { newRewardPerBlock: joy(200), lead: worker },
  SignalProposalDetails: { text: randomMarkdown() },
  SlashWorkingGroupLeadProposalDetails: { amount: joy(200), lead: worker },
  TerminateWorkingGroupLeadProposalDetails: { slashingAmount: joy(200), lead: worker },
  UpdateChannelPayoutsProposalDetails: {
    channelCashoutsEnabled: true,
    minCashoutAllowed: joy(200),
    maxCashoutAllowed: joy(200),
    payloadHash: '0x000000',
  },
  UpdateWorkingGroupBudgetProposalDetails: { amount: joy(200), group: workingGroup },
  VetoProposalDetails: { proposal: { __typename: 'Proposal', id: '0', title: random.words(4) } },
}

type Args = {
  isCouncilMember: boolean
  isProposer: boolean
  isDiscussionOpen: boolean
  isInDiscussionWhitelist: boolean
  type: ProposalDetailsType
  constitutionality: number
}

export default {
  title: 'Pages/Proposals/ProposalPreview',
  component: ProposalPreview,

  argTypes: {
    type: { control: { type: 'select' }, options: Object.keys(details) },
    constitutionality: { control: { type: 'range', min: 1, max: 4 } },
  },
  args: {
    isCouncilMember: false,
    isProposer: false,
    isInDiscussionWhitelist: false,
    isDiscussionOpen: true,
    type: 'SignalProposalDetails',
    constitutionality: 1,
  },

  parameters: {
    router: { path: '/:id', href: '/0' },

    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const { constitutionality, isCouncilMember } = args

      const alice = member('alice', { isCouncilMember })
      const dave = member('dave', { isCouncilMember: !isCouncilMember })

      const status = last(parameters.statuses) as ProposalStatus
      const updates = parameters.statuses.slice(1, proposalActiveStatus.includes(status) ? undefined : -1)

      return {
        accounts: { active: alice },

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
        },

        queryNode: [
          {
            query: GetProposalDocument,
            data: {
              proposal: {
                id: '0',
                title,
                description,
                votes: [],
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
              },
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
                  { id: '0', unpaidReward: '0', stake: joy(200), member: isCouncilMember ? alice : dave },
                  { id: '1', unpaidReward: '0', stake: joy(200), member: bob },
                  { id: '2', unpaidReward: '0', stake: joy(200), member: charlie },
                ],
              },
            },
          },
        ],
      }
    },

    statuses: [
      'ProposalStatusDeciding',
      'ProposalStatusDormant',
      'ProposalStatusDeciding',
      'ProposalStatusGracing',
    ] satisfies ProposalStatus[],
  },
} satisfies Meta<Args>

type Story = StoryObj<typeof ProposalPreview>

export const AmendConstitution: Story = {
  args: { type: 'AmendConstitutionProposalDetails', constitutionality: 2 },
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
}
export const SetCouncilBudgetIncrement: Story = {
  args: { type: 'SetCouncilBudgetIncrementProposalDetails', constitutionality: 2 },
}
export const SetCouncilorReward: Story = {
  args: { type: 'SetCouncilorRewardProposalDetails', constitutionality: 2 },
}
export const SetInitialInvitationBalance: Story = {
  args: { type: 'SetInitialInvitationBalanceProposalDetails' },
}
export const SetInitialInvitationCount: Story = {
  args: { type: 'SetInitialInvitationCountProposalDetails' },
}
export const SetMaxValidatorCount: Story = {
  args: { type: 'SetMaxValidatorCountProposalDetails', constitutionality: 2 },
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

const proposalDetailsMap = mapValues(details, (value, __typename) => Object.assign(value, { __typename }))
