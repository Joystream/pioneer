import { omit } from 'lodash'

import { isDefined } from '@/common/utils'
import {
  ProposalDetails,
  ProposalDetailsKeys,
  ProposalWithDetails,
  RewardPerBlockDetail,
  StakeAmountDetail,
  UnstakingPeriodDetail,
  GroupDetail,
  GroupNameDetail,
  MemberDetail,
  NewByteCodeIdDetail,
  OpeningDescriptionDetail,
  AmountDetail,
  DestinationsDetail,
  ProposalType,
  SignalTextDetail,
  CountDetail,
  ProposalDetail,
  OpeningLinkDetail,
} from '@/proposals/types'

export type RenderType =
  | 'Text'
  | 'Amount'
  | 'Numeric'
  | 'Markdown'
  | 'RuntimeBlob'
  | 'NumberOfBlocks'
  | 'Member'
  | 'Address'
  | 'Divider'
  | 'ProposalLink'
  | 'OpeningLink'
  | 'Percentage'

export interface RenderNode {
  label?: string
  value?: any
  renderType: RenderType
}

type Mapper<Detail, Key extends keyof Detail> = (
  value: Required<Detail>[Key],
  type: ProposalDetails['type']
) => RenderNode[]

const destinationsMapper: Mapper<DestinationsDetail, 'destinations'> = (value): RenderNode[] => {
  const result: RenderNode[] = []

  value.forEach((destination) => {
    result.push({
      label: 'amount',
      value: destination.amount,
      renderType: 'Amount',
    })
    result.push({
      label: 'destination',
      value: destination.account,
      renderType: 'Address',
    })
    result.push({
      renderType: 'Divider',
    })
  })

  return result
}
const newBytecodeIdMapper: Mapper<NewByteCodeIdDetail, 'newBytecodeId'> = (value): RenderNode[] => {
  return [
    {
      label: 'Blob',
      value: value,
      renderType: 'RuntimeBlob',
    },
  ]
}
const groupMapper: Mapper<GroupDetail, 'group'> = (value): RenderNode[] => {
  return [
    {
      label: 'Working Group',
      value: value.name,
      renderType: 'Text',
    },
  ]
}
const openingDescriptionMapper: Mapper<OpeningDescriptionDetail, 'openingDescription'> = (value): RenderNode[] => {
  return [
    {
      label: 'Opening Description',
      value: value,
      renderType: 'Markdown',
    },
  ]
}
const signalTextMapper: Mapper<SignalTextDetail, 'signalText'> = (value): RenderNode[] => {
  return [
    {
      label: 'Signal Text',
      value: value,
      renderType: 'Markdown',
    },
  ]
}
const rewardPerBlockMapper: Mapper<RewardPerBlockDetail, 'rewardPerBlock'> = (value): RenderNode[] => {
  return [
    {
      label: 'Reward per Block',
      value: value,
      renderType: 'Amount',
    },
  ]
}
const stakeAmountMapper: Mapper<StakeAmountDetail, 'stakeAmount'> = (value): RenderNode[] => {
  return [
    {
      label: 'Staking amount',
      value: value,
      renderType: 'Amount',
    },
  ]
}
const unstakingPeriodMapper: Mapper<UnstakingPeriodDetail, 'unstakingPeriod'> = (value): RenderNode[] => {
  return [
    {
      label: 'Leaving unstaking period',
      value: value,
      renderType: 'NumberOfBlocks',
    },
  ]
}
const groupNameMapper: Mapper<GroupNameDetail, 'groupName'> = (value): RenderNode[] => {
  return [
    {
      label: 'Working Group',
      value: value,
      renderType: 'Text',
    },
  ]
}
const memberMapper: Mapper<MemberDetail, 'member'> = (value): RenderNode[] => {
  return [
    {
      label: 'Worker ID',
      value: value.id,
      renderType: 'Member',
    },
  ]
}

const percentageMapper: Mapper<AmountDetail, 'amount'> = (value, type): RenderNode[] => {
  const defaultLabel = 'Percentage'
  const overriddenLabelsBy: Partial<Record<ProposalType, string>> = {
    setReferralCut: 'Referral cut',
  }
  const overriddenLabel = type && overriddenLabelsBy[type]

  return [
    {
      label: overriddenLabel || defaultLabel,
      renderType: 'Percentage',
      value,
    },
  ]
}

const amountMapper: Mapper<AmountDetail, 'amount'> = (value, type): RenderNode[] => {
  const defaultLabel = 'Amount'
  const overriddenLabelsBy: Partial<Record<ProposalType, string>> = {
    decreaseWorkingGroupLeadStake: 'Decrease stake amount',
    slashWorkingGroupLead: 'Slashing amount',
  }
  const overriddenLabel = type && overriddenLabelsBy[type]

  return [
    {
      label: overriddenLabel || defaultLabel,
      value: value,
      renderType: 'Amount',
    },
  ]
}
const countMapper: Mapper<CountDetail, 'count'> = (value, type) => {
  const countLabels: Partial<Record<ProposalType, string>> = {
    setInitialInvitationCount: 'Invitations',
    setMaxValidatorCount: 'Validators',
  }
  const label = type && type in countLabels ? countLabels[type] : 'Count'
  return [
    {
      label,
      value,
      renderType: 'Numeric',
    },
  ]
}
const proposalLinkMapper: Mapper<ProposalDetail, 'proposal'> = (value) => {
  return [
    {
      label: 'Proposal',
      value,
      renderType: 'ProposalLink',
    },
  ]
}
const openingLinkMapper: Mapper<OpeningLinkDetail, 'openingId'> = (value) => {
  return [
    {
      label: 'Opening',
      value,
      renderType: 'OpeningLink',
    },
  ]
}

const percentageProposalsAmount: ProposalType[] = ['setReferralCut']

const mappers: Partial<Record<ProposalDetailsKeys, Mapper<any, any>>> = {
  destinations: destinationsMapper,
  newBytecodeId: newBytecodeIdMapper,
  group: groupMapper,
  openingDescription: openingDescriptionMapper,
  signalText: signalTextMapper,
  rewardPerBlock: rewardPerBlockMapper,
  stakeAmount: stakeAmountMapper,
  unstakingPeriod: unstakingPeriodMapper,
  groupName: groupNameMapper,
  member: memberMapper,
  amount: amountMapper,
  count: countMapper,
  proposal: proposalLinkMapper,
  openingId: openingLinkMapper,
}

const mapProposalDetail = (key: ProposalDetailsKeys, proposalDetails: ProposalWithDetails['details']) => {
  const value = proposalDetails[key as keyof typeof proposalDetails]

  if (percentageProposalsAmount.includes(proposalDetails.type as ProposalType) && key === 'amount') {
    return percentageMapper((value as any).toNumber(), proposalDetails.type)
  }

  if (!mappers[key]) {
    return
  }

  return mappers[key]?.(value, proposalDetails.type)
}

const getDetailsOrder = (proposalDetails: ProposalDetails): ProposalDetailsKeys[] => {
  const definedOrders: Partial<Record<ProposalType, ProposalDetailsKeys[]>> = {
    createWorkingGroupLeadOpening: ['group', 'stakeAmount', 'unstakingPeriod', 'rewardPerBlock', 'openingDescription'],
    decreaseWorkingGroupLeadStake: ['groupName', 'member', 'amount'],
    slashWorkingGroupLead: ['groupName', 'member', 'amount'],
    updateWorkingGroupBudget: ['group', 'amount'],
  }

  if (proposalDetails.type) {
    const order = definedOrders[proposalDetails.type]
    if (isDefined(order)) {
      return order
    }
  }

  return Object.keys(omit(proposalDetails, 'type')) as ProposalDetailsKeys[]
}

const getDetailsRenderStructure = (proposalDetails?: ProposalWithDetails['details']) => {
  if (!proposalDetails) return {}

  const structure = getDetailsOrder(proposalDetails).map((key: ProposalDetailsKeys) =>
    mapProposalDetail(key, proposalDetails)
  )

  return {
    structure: structure.filter(Array.isArray).flatMap((f) => f),
  }
}

export default getDetailsRenderStructure
