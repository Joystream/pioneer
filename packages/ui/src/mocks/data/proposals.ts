import { SubmittableExtrinsic } from '@polkadot/api/types'
import { random } from 'faker'
import { mapValues, merge } from 'lodash'

import { RecursivePartial } from '@/common/types/helpers'
import { repeat } from '@/common/utils'
import { worker, workingGroup, workingGroupOpening } from '@/mocks/data/common'
import { isoDate, joy } from '@/mocks/helpers'
import { ProposalWithDetailsFieldsFragment } from '@/proposals/queries'

import { ProposalDetailsType, proposalDetailsToConstantKey } from '../helpers/proposalDetailsToConstantKey'
import { MocksParameters } from '../providers'

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
  FundingRequestMultipleRecipientsProposalDetails: {
    destinationsList: {
      __typename: 'FundingRequestDestinationsList',
      destinations: [
        { __typename: 'FundingRequestDestination', amount: joy(200), account: membership.rootAccount },
        { __typename: 'FundingRequestDestination', amount: joy(20), account: member('alice').rootAccount },
        { __typename: 'FundingRequestDestination', amount: joy(1), account: member('bob').rootAccount },
        { __typename: 'FundingRequestDestination', amount: joy(500), account: member('charlie').rootAccount },
      ],
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

export const proposalDetailsMap = mapValues(proposalDetails, (value, key) => {
  const __typename = key === 'FundingRequestMultipleRecipientsProposalDetails' ? 'FundingRequestProposalDetails' : key
  return Object.assign(value, { __typename }) as Partial<ProposalWithDetailsFieldsFragment['details']>
})

export const proposalTypes = Object.keys(proposalDetailsMap) as ProposalDetailsType[]

export const MAX_ACTIVE_PROPOSAL = 20

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

type ProposalChainProps = {
  activeProposalCount: number
  minimumValidatorCount?: number
  setMaxValidatorCountProposalMaxValidators?: number
  initialInvitationCount?: number
  initialInvitationBalance?: string

  councilSize?: number
  councilBudget?: string
  councilorReward?: string
  nextRewardPayments?: number

  onAddStakingAccountCandidate?: jest.Mock
  onConfirmStakingAccount?: jest.Mock
  onCreateProposal?: jest.Mock
  onChangeThreadMode?: jest.Mock

  addStakingAccountCandidateFailure?: string
  confirmStakingAccountFailure?: string
  createProposalFailure?: string
  changeThreadModeFailure?: string
}
type Chain = MocksParameters['chain']
export const proposalsPagesChain = (
  {
    activeProposalCount,
    minimumValidatorCount = 4,
    setMaxValidatorCountProposalMaxValidators = 100,
    initialInvitationCount = 5,
    initialInvitationBalance = joy(5),

    councilSize = 3,
    councilBudget = joy(2000),
    councilorReward = joy(200),
    nextRewardPayments = 12345,

    onAddStakingAccountCandidate,
    onConfirmStakingAccount,
    onCreateProposal,
    onChangeThreadMode,

    addStakingAccountCandidateFailure,
    confirmStakingAccountFailure,
    createProposalFailure,
    changeThreadModeFailure,
  }: ProposalChainProps,
  extra?: Chain
): Chain =>
  merge(
    {
      consts: {
        content: {
          minimumCashoutAllowedLimit: joy(166),
          maximumCashoutAllowedLimit: joy(1_666_666),
        },

        council: { councilSize, idlePeriodDuration: 1, announcingPeriodDuration: 1 },
        referendum: { voteStageDuration: 1, revealStageDuration: 1 },

        members: {
          referralCutMaximumPercent: 50,
        },

        proposalsEngine: {
          maxActiveProposalLimit: MAX_ACTIVE_PROPOSAL,
          descriptionMaxLength: 3000,
          titleMaxLength: 40,
        },

        proposalsCodex: {
          fundingRequestProposalMaxTotalAmount: joy(166_666),
          fundingRequestProposalMaxAccounts: 2,
          setMaxValidatorCountProposalMaxValidators,

          ...Object.fromEntries(
            proposalTypes.map((type) => [
              proposalDetailsToConstantKey(type),
              {
                votingPeriod: 200,
                gracePeriod: 100,
                approvalQuorumPercentage: 80,
                approvalThresholdPercentage: 100,
                slashingQuorumPercentage: 60,
                slashingThresholdPercentage: 80,
                requiredStake: joy(20),
                constitutionality: 2,
              },
            ])
          ),
        },
      },

      query: {
        council: {
          budget: councilBudget,
          councilorReward,
          nextRewardPayments,
          stage: { stage: { isIdle: true }, changedAt: 123 },
        },
        referendum: { stage: {} },

        members: {
          initialInvitationCount,
          initialInvitationBalance,
          membershipPrice: joy(20),
          stakingAccountIdMemberStatus: {
            memberId: 0,
            confirmed: false,
            size: 0,
          },
        },

        proposalsEngine: { activeProposalCount },
        staking: { minimumValidatorCount },
      },

      tx: {
        proposalsCodex: {
          createProposal: { event: 'ProposalCreated', onSend: onCreateProposal, failure: createProposalFailure },
        },
        proposalsDiscussion: {
          changeThreadMode: {
            event: 'ThreadModeChanged',
            onSend: onChangeThreadMode,
            failure: changeThreadModeFailure,
          },
        },

        members: {
          addStakingAccountCandidate: {
            event: 'StakingAccountAdded',
            onSend: onAddStakingAccountCandidate,
            failure: addStakingAccountCandidateFailure,
          },
          confirmStakingAccount: {
            event: 'StakingAccountConfirmed',
            onSend: onConfirmStakingAccount,
            failure: confirmStakingAccountFailure,
          },
        },

        utility: {
          batch: {
            failure: createProposalFailure,
            onSend: (transactions: SubmittableExtrinsic<'rxjs'>[]) =>
              transactions.forEach((transaction) => transaction.signAndSend('')),
          },
        },
      },
    } satisfies Chain,
    extra
  )
