import { omit } from 'lodash'

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
} from '@/proposals/types'

export type RenderType =
  | 'Text'
  | 'Amount'
  | 'Markdown'
  | 'RuntimeBlob'
  | 'NumberOfBlocks'
  | 'Member'
  | 'Address'
  | 'Divider'

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
      label: 'Description',
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
const amountMapper: Mapper<AmountDetail, 'amount'> = (value, type): RenderNode[] => {
  const defaultLabel = 'Amount'
  const overriddenLabelsBy: { [key: string]: string } = {
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

const mappers: Partial<Record<ProposalDetailsKeys, Mapper<any, any>>> = {
  destinations: destinationsMapper,
  newBytecodeId: newBytecodeIdMapper,
  group: groupMapper,
  openingDescription: openingDescriptionMapper,
  rewardPerBlock: rewardPerBlockMapper,
  stakeAmount: stakeAmountMapper,
  unstakingPeriod: unstakingPeriodMapper,
  groupName: groupNameMapper,
  member: memberMapper,
  amount: amountMapper,
}

const mapProposalDetail = (key: ProposalDetailsKeys, proposalDetails: ProposalWithDetails['details']) => {
  const value = proposalDetails[key as keyof typeof proposalDetails]

  if (!mappers[key]) {
    return
  }

  return mappers[key]?.(value, proposalDetails.type)
}

const getDetailsOrder = (proposalDetails: ProposalDetails): ProposalDetailsKeys[] => {
  const definedOrders: { [key: string]: ProposalDetailsKeys[] } = {
    createWorkingGroupLeadOpening: ['group', 'stakeAmount', 'unstakingPeriod', 'rewardPerBlock', 'openingDescription'],
    decreaseWorkingGroupLeadStake: ['groupName', 'member', 'amount'],
    slashWorkingGroupLead: ['groupName', 'member', 'amount'],
  }

  if (proposalDetails.type && definedOrders[proposalDetails.type]) {
    return definedOrders[proposalDetails.type]
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
