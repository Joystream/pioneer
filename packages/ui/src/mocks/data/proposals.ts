import { random } from 'faker'
import { mapValues } from 'lodash'

import { worker, workingGroup, workingGroupOpening } from '@/mocks/data/common'
import { joy } from '@/mocks/helpers'
import { ProposalWithDetailsFieldsFragment } from '@/proposals/queries'

import { member } from './members'
import forumPosts from './raw/forumPosts.json'

import { randomMarkdown } from '@/../dev/query-node-mocks/generators/utils'

export type ProposalStatus = ProposalWithDetailsFieldsFragment['status']['__typename']

export const proposalActiveStatus = ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusGracing']

const membership = member('eve')
export const proposalDiscussionPosts = forumPosts.slice(0, 2).map(({ threadId, postAddedEvent, ...fields }) => ({
  ...fields,
  discussionThread: threadId,
  author: membership,
  status: { __typename: 'ProposalDiscussionPostStatusActive' },
  createdInEvent: postAddedEvent,
}))

const proposalDetails = {
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
    application: { __typename: 'WorkingGroupApplication', applicant: membership },
  },
  FundingRequestProposalDetails: {
    destinationsList: {
      __typename: 'FundingRequestDestinationsList',
      destinations: [{ __typename: 'FundingRequestDestination', amount: joy(200), account: membership.rootAccount }],
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
export const proposalDetailsMap = mapValues(proposalDetails, (value, __typename) =>
  Object.assign(value, { __typename })
)
