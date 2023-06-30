import { random } from 'faker'
import { mapValues } from 'lodash'

import { RecursivePartial } from '@/common/types/helpers'
import { repeat } from '@/common/utils'
import { worker, workingGroup, workingGroupOpening } from '@/mocks/data/common'
import { isoDate, joy } from '@/mocks/helpers'
import { ProposalWithDetailsFieldsFragment } from '@/proposals/queries'

import { ProposalDetailsType } from '../helpers/proposalDetailsToConstantKey'

import { Membership, member } from './members'
import forumPosts from './raw/forumPosts.json'

import { randomMarkdown } from '@/../dev/query-node-mocks/generators/utils'

export type ProposalStatus = ProposalWithDetailsFieldsFragment['status']['__typename']

export const proposalActiveStatus = ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusGracing']

export type PartialProposal = RecursivePartial<ProposalWithDetailsFieldsFragment>

const membership = member('eve')

type ProposalPost = ProposalWithDetailsFieldsFragment['discussionThread']['posts'][number]
export const proposalDiscussionPosts: RecursivePartial<ProposalPost>[] = forumPosts
  .slice(0, 2)
  .map<RecursivePartial<ProposalPost>>(({ threadId, postAddedEvent, ...fields }) => ({
    ...fields,
    author: membership,
    status: { __typename: 'ProposalDiscussionPostStatusActive' },
    createdInEvent: postAddedEvent as Partial<ProposalPost['createdInEvent']>,
    discussionThread: { id: threadId } as Partial<ProposalPost['discussionThread']>,
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
} as Record<string, RecursivePartial<ProposalWithDetailsFieldsFragment['details']>>

export const proposalDetailsMap = mapValues(
  proposalDetails,
  (value, __typename) => Object.assign(value, { __typename }) as Partial<ProposalWithDetailsFieldsFragment['details']>
)

export const proposalTypes = Object.keys(proposalDetailsMap) as ProposalDetailsType[]

type ProposalData = Omit<PartialProposal, 'status'> & {
  id: string
  title: string
  description: string
  creator: Membership
  type: ProposalDetailsType
  status: ProposalStatus
}
export const generateProposal = (data: ProposalData): PartialProposal => ({
  createdInEvent: { inBlock: 123, createdAt: isoDate('2023/01/02') },
  statusSetAtBlock: 123,
  statusSetAtTime: isoDate('2023/01/12'),

  ...data,

  details: proposalDetailsMap[data.type],
  status: { __typename: data.status },
})

type ProposalsProps = {
  title: string
  description: string
  creator: Membership
  statuses: ProposalStatus[]
  limit?: number
  offset?: number
}
export const generateProposals = (
  { title, description, creator, statuses, limit = 5, offset = 0 }: ProposalsProps,
  max: number
) =>
  repeat((index) => {
    const id = 123 + index + offset
    return generateProposal({
      id: String(id),
      status: statuses.at(id % statuses.length) ?? statuses[0],
      type: proposalTypes.at(id % proposalTypes.length) ?? proposalTypes[0],
      title,
      creator,
      description,
      councilApprovals: 0,
    })
  }, Math.min(limit, max - offset))
