import { Meta, StoryObj } from '@storybook/react'
import { random } from 'faker'
import { mapValues } from 'lodash'

import { asBN } from '@/common/utils'
import { GetElectedCouncilDocument } from '@/council/queries'
import { amount, block, worker, workingGroup, workingGroupOpening } from '@/mocks/data/common'
import { alice, bob, charlie } from '@/mocks/data/members'
import { ProposalDetailsType, proposalDetailsToConstantKey } from '@/mocks/helpers/proposalDetailsToConstantKey'
import { GetProposalDocument } from '@/proposals/queries'

import { randomMarkdown } from '../../../../dev/query-node-mocks/generators/utils'

import { ProposalPreview } from './ProposalPreview'

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
    stakeAmount: amount,
    unstakingPeriod: 3400,
    rewardPerBlock: amount,
    metadata: { __typename: 'WorkingGroupOpeningMetadata', description: randomMarkdown() },
    group: workingGroup,
  },
  DecreaseWorkingGroupLeadStakeProposalDetails: { amount, lead: worker },
  FillWorkingGroupLeadOpeningProposalDetails: {
    opening: workingGroupOpening,
    application: { __typename: 'WorkingGroupApplication', applicant: alice },
  },
  FundingRequestProposalDetails: {
    destinationsList: {
      __typename: 'FundingRequestDestinationsList',
      destinations: [{ __typename: 'FundingRequestDestination', amount, account: alice.rootAccount }],
    },
  },
  RuntimeUpgradeProposalDetails: { newRuntimeBytecode: { __typename: 'RuntimeWasmBytecode', id: '0' } },
  SetCouncilBudgetIncrementProposalDetails: { newAmount: amount },
  SetCouncilorRewardProposalDetails: { newRewardPerBlock: amount },
  SetInitialInvitationBalanceProposalDetails: { newInitialInvitationBalance: amount },
  SetInitialInvitationCountProposalDetails: { newInitialInvitationsCount: 100 },
  SetMaxValidatorCountProposalDetails: { newMaxValidatorCount: 100 },
  SetMembershipLeadInvitationQuotaProposalDetails: { newLeadInvitationQuota: 100 },
  SetMembershipPriceProposalDetails: { newPrice: amount },
  SetReferralCutProposalDetails: { newReferralCut: 100 },
  SetWorkingGroupLeadRewardProposalDetails: { newRewardPerBlock: amount, lead: worker },
  SignalProposalDetails: { text: randomMarkdown() },
  SlashWorkingGroupLeadProposalDetails: { amount: amount, lead: worker },
  TerminateWorkingGroupLeadProposalDetails: { slashingAmount: amount, lead: worker },
  UpdateChannelPayoutsProposalDetails: {
    channelCashoutsEnabled: true,
    minCashoutAllowed: amount,
    maxCashoutAllowed: amount,
    payloadHash: '0x000000',
  },
  UpdateWorkingGroupBudgetProposalDetails: { amount, group: workingGroup },
  VetoProposalDetails: { proposal: { __typename: 'Proposal', id: '0', title: random.words(4) } },
}

type Args = { type: ProposalDetailsType; status: (typeof statuses)[number]; constitutionality: number }

export default {
  title: 'Pages/Proposals/ProposalPreview',
  component: ProposalPreview,
  argTypes: {
    type: { control: { type: 'select' }, options: Object.keys(details) },
    status: { control: { type: 'select' }, options: statuses },
    constitutionality: { control: false },
  },
  args: { type: 'SignalProposalDetails', status: 'ProposalStatusDeciding', constitutionality: 1 },
  parameters: {
    router: { path: '/:id', href: `/${id}` },

    queryNode: [
      {
        query: GetProposalDocument,
        resolver: (_: any, { type, status }: Args) => ({
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
              creator: alice,
              details: proposalDetailsMap[type],
              status: { __typename: status },
              proposalStatusUpdates: [],
            },
          },
        }),
      },
      {
        query: GetElectedCouncilDocument,
        data: {
          electedCouncils: {
            id: '0',
            electedAtBlock: block.inBlock,
            electedAtTime: block.createdAt,
            councilElections: [{ cycleId: 4 }],
            councilMembers: [
              { id: '0', unpaidReward: '0', stake: amount, member: alice },
              { id: '1', unpaidReward: '0', stake: amount, member: bob },
              { id: '2', unpaidReward: '0', stake: amount, member: charlie },
            ],
          },
        },
      },
    ],

    api: {
      consts: [
        {
          path: 'proposalsCodex',
          get: ({ type, constitutionality }: Args) => ({
            [proposalDetailsToConstantKey(type) as string]: mapValues(
              {
                votingPeriod: 200,
                gracePeriod: 100,
                approvalQuorumPercentage: 80,
                approvalThresholdPercentage: 100,
                slashingQuorumPercentage: 60,
                slashingThresholdPercentage: 80,
                requiredStake: amount,
                constitutionality,
              },
              asBN
            ),
          }),
        },
        { path: 'council.councilSize', value: asBN(3) },
        { path: 'council.idlePeriodDuration', value: asBN(1) },
        { path: 'council.announcingPeriodDuration', value: asBN(1) },
        { path: 'referendum.voteStageDuration', value: asBN(1) },
        { path: 'referendum.revealStageDuration', value: asBN(1) },
      ],
      query: [
        { path: 'members.membershipPrice', value: asBN(amount) },
        { path: 'council.budget', value: asBN(amount) },
        { path: 'council.councilorReward', value: asBN(amount) },
        { path: 'council.stage', value: { stage: { isIdle: true }, changedAt: asBN(123) } },
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
