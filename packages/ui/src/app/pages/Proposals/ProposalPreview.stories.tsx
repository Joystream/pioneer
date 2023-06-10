import { Meta, StoryObj } from '@storybook/react'
import { random } from 'faker'
import { mapValues } from 'lodash'

import { GetElectedCouncilDocument } from '@/council/queries'
import { worker, workingGroup, workingGroupOpening } from '@/mocks/data/common'
import { alice, bob, charlie, dave } from '@/mocks/data/members'
import { isoDate, joy } from '@/mocks/helpers'
import { ProposalDetailsType, proposalDetailsToConstantKey } from '@/mocks/helpers/proposalDetailsToConstantKey'
import { GetProposalDocument } from '@/proposals/queries'

import { ProposalPreview } from './ProposalPreview'

import { randomMarkdown } from '@/../dev/query-node-mocks/generators/utils'

const id = '0'

const title = random.words(4)
const description = randomMarkdown()

const statuses = [
  'ProposalStatusCanceledByRuntime',
  'ProposalStatusCancelled',
  'ProposalStatusDeciding',
  'ProposalStatusDormant',
  'ProposalStatusExecuted',
  'ProposalStatusExecutionFailed',
  'ProposalStatusExpired',
  'ProposalStatusGracing',
  'ProposalStatusRejected',
  'ProposalStatusSlashed',
  'ProposalStatusVetoed',
] as const

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
    application: { __typename: 'WorkingGroupApplication', applicant: alice },
  },
  FundingRequestProposalDetails: {
    destinationsList: {
      __typename: 'FundingRequestDestinationsList',
      destinations: [{ __typename: 'FundingRequestDestination', amount: joy(200), account: alice.rootAccount }],
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
  isCouncilor: boolean
  isProposer: boolean
  type: ProposalDetailsType
  status: (typeof statuses)[number]
  constitutionality: number
}

export default {
  title: 'Pages/Proposals/ProposalPreview',
  component: ProposalPreview,

  argTypes: {
    type: { control: { type: 'select' }, options: Object.keys(details) },
    status: { control: { type: 'select' }, options: statuses },
    constitutionality: { control: false },
  },
  args: {
    isCouncilor: false,
    isProposer: false,
    type: 'SignalProposalDetails',
    status: 'ProposalStatusDeciding',
    constitutionality: 1,
  },

  parameters: {
    router: { path: '/:id', href: `/${id}` },

    // Alice is the proposer and is councilor, Bob is councilor too, and Dave isn't councilor
    accounts: { active: alice, list: [{ member: alice }] },

    queryNode: [
      {
        query: GetProposalDocument,
        resolver: (_: any, { isProposer, type, status }: Args) => ({
          loading: false,
          data: {
            proposal: {
              id,
              title,
              description,
              votes: [],
              createdInEvent: {},
              discussionThread: {
                posts: [],
                mode: {},
              },
              creator: isProposer ? alice : bob,
              details: proposalDetailsMap[type],
              status: { __typename: status },
              proposalStatusUpdates: [],
            },
          },
        }),
      },
      {
        query: GetElectedCouncilDocument,
        resolver: (_: any, { isCouncilor }: Args) => ({
          loading: false,
          data: {
            electedCouncils: {
              id: '0',
              electedAtBlock: 123,
              electedAtTime: isoDate('01/02/2023'),
              councilElections: [{ cycleId: 4 }],
              councilMembers: [
                { id: '0', unpaidReward: '0', stake: joy(200), member: isCouncilor ? alice : dave },
                { id: '1', unpaidReward: '0', stake: joy(200), member: bob },
                { id: '2', unpaidReward: '0', stake: joy(200), member: charlie },
              ],
            },
          },
        }),
      },
    ],

    api: {
      consts: [
        {
          path: 'proposalsCodex',
          get: ({ type, constitutionality }: Args) => ({
            [proposalDetailsToConstantKey(type) as string]: {
              votingPeriod: 200,
              gracePeriod: 100,
              approvalQuorumPercentage: 80,
              approvalThresholdPercentage: 100,
              slashingQuorumPercentage: 60,
              slashingThresholdPercentage: 80,
              requiredStake: joy(200),
              constitutionality,
            },
          }),
        },
        { path: 'council.councilSize', value: 3 },
        { path: 'council.idlePeriodDuration', value: 1 },
        { path: 'council.announcingPeriodDuration', value: 1 },
        { path: 'referendum.voteStageDuration', value: 1 },
        { path: 'referendum.revealStageDuration', value: 1 },
      ],
      query: [
        { path: 'members.membershipPrice', value: joy(5) },
        { path: 'council.budget', value: joy(1000) },
        { path: 'council.councilorReward', value: joy(500) },
        { path: 'council.stage', value: { stage: { isIdle: true }, changedAt: 123 } },
        { path: 'referendum.stage', value: {} },
      ],
    },
  },
} satisfies Meta

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
