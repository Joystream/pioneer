import BN from 'bn.js'
import { omit } from 'lodash'

import { TooltipContentProp } from '@/common/components/Tooltip'
import { nameMapping } from '@/common/helpers'
import { isDefined } from '@/common/utils'
import {
  ProposalDetails,
  ProposalDetailsKeys,
  ProposalWithDetails,
  RewardPerBlockDetail,
  StakeAmountDetail,
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
  UpdateChannelPayoutsDetail,
  UpdatePalletFrozenStatusDetail,
  BlockDetail,
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
  | 'Hash'
  | 'DestinationsPreview'
  | 'BlockTimeDisplay'
  | 'AddressesPreview'

export interface RenderNode {
  label: string
  value: any
  renderType: RenderType
  tooltip?: TooltipContentProp
  units?: string
}

type Mapper<Detail, Key extends keyof Detail> = (
  value: Required<Detail>[Key],
  type: ProposalDetails['type']
) => RenderNode[]

const destinationsMapper: Mapper<DestinationsDetail, 'destinations'> = (value): RenderNode[] => {
  const result: RenderNode[] = []

  if (value.length === 1) {
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
    })
  }
  if (value.length > 1) {
    let total = new BN(0)
    value.forEach((destination) => {
      total = total.add(destination.amount)
    })
    result.push({
      label: 'Total Payment',
      value: total,
      renderType: 'Amount',
    })
    result.push({
      label: 'Payment Details',
      value: value,
      renderType: 'DestinationsPreview',
    })
  }

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
      value: nameMapping(value.name),
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

const blocksMapper =
  (label: string): Mapper<BlockDetail, 'blocks'> =>
  (value): RenderNode[] => {
    return [
      {
        label,
        value,
        renderType: 'NumberOfBlocks',
      },
    ]
  }

const textMapper =
  (label: string, tooltip?: TooltipContentProp): Mapper<GroupNameDetail, 'groupName'> =>
  (value): RenderNode[] => {
    return [
      {
        label,
        tooltip,
        value: value,
        renderType: 'Text',
      },
    ]
  }
const memberMapper: Mapper<MemberDetail, 'member'> = (value): RenderNode[] => {
  return [
    {
      label: 'Worker ID',
      value: value?.id,
      renderType: 'Member',
    },
  ]
}

const percentageMapper =
  (label = 'Percentage'): Mapper<AmountDetail, 'amount'> =>
  (value): (RenderNode & { units: '%' })[] =>
    [
      {
        label,
        renderType: 'Numeric',
        units: '%',
        value,
      },
    ]

const booleanMapper: Mapper<UpdateChannelPayoutsDetail, 'channelCashoutsEnabled'> = (value) => {
  return [
    {
      label: 'Payout possibility',
      renderType: 'Text',
      value: value ? 'Allowed' : 'Not allowed',
    },
  ]
}

const palletStatusMapper: Mapper<UpdatePalletFrozenStatusDetail, 'freeze'> = (freezePallet) => {
  return [
    {
      label: 'Proposed Status',
      renderType: 'Text',
      value: freezePallet ? 'Disable' : 'Enable',
    },
  ]
}
const palletMapper: Mapper<UpdatePalletFrozenStatusDetail, 'pallet'> = (pallet) => {
  return [
    {
      label: 'Pallet',
      renderType: 'Text',
      value: pallet,
    },
  ]
}
const amountMapper =
  (label?: string): Mapper<AmountDetail, 'amount'> =>
  (value, type): RenderNode[] => {
    const overriddenLabelsBy: Partial<Record<ProposalType, string>> = {
      decreaseWorkingGroupLeadStake: 'Decrease stake amount',
      slashWorkingGroupLead: 'Slashing amount',
      decreaseCouncilBudget: 'Decrease budget by',
    }
    return [
      {
        label: label ?? (type && overriddenLabelsBy[type]) ?? 'Amount',
        value: value,
        renderType: 'Amount',
      },
    ]
  }
const countMapper =
  (label = ''): Mapper<CountDetail, 'count'> =>
  (value, type) => {
    const countLabels: Partial<Record<ProposalType, string>> = {
      setInitialInvitationCount: 'Invitations',
      setMaxValidatorCount: 'Validators',
    }
    return [
      {
        label: label || (type && type in countLabels && countLabels[type]) || 'Count',
        value,
        renderType: 'Numeric',
      },
    ]
  }

const hashMapper =
  (label: string, tooltip?: TooltipContentProp): Mapper<UpdateChannelPayoutsDetail, 'payloadHash'> =>
  (value) => {
    return [{ label, value, tooltip, renderType: 'Hash' }]
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
const addressMapper =
  (label: string) =>
  (value: string): RenderNode[] => {
    return [
      {
        label,
        value,
        renderType: 'Address',
      },
    ]
  }
const addressesMapper =
  (label: string) =>
  (value: string[]): RenderNode[] => {
    return [
      {
        label,
        value,
        renderType: 'AddressesPreview',
      },
    ]
  }

const listMapper =
  (label: string) =>
  (value: unknown[]): RenderNode[] => {
    return [
      {
        label,
        value: value.map(String).join(', '),
        renderType: 'Text',
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
  unstakingPeriod: blocksMapper('Leaving unstaking period'),
  groupName: textMapper('Working Group'),
  member: memberMapper,
  amount: amountMapper(),
  count: countMapper(),
  proposal: proposalLinkMapper,
  openingId: openingLinkMapper,
  channelCashoutsEnabled: booleanMapper,
  minCashoutAllowed: amountMapper('Minimal Cashout'),
  maxCashoutAllowed: amountMapper('Maximal Cashout'),
  payloadHash: hashMapper('payloadHash', {
    tooltipText: 'This is the BLAKE3 hash fo the Executable payload file',
    tooltipLinkURL: 'https://github.com/BLAKE3-team/BLAKE3',
  }),
  payloadDataObjectId: textMapper('Data Object Id', {
    tooltipText:
      'This is the ID submitted to Chain for the Data Object (payout payload) to be further uploaded to the Storage. It will be displayed after proposal is executed.',
  }),
  pallet: palletMapper,
  freeze: palletStatusMapper,

  // SetEraPayoutDampingFactor
  multiplier: percentageMapper('Validator reward multiplier'),

  // UpdateTokenPalletTokenConstraints
  maxYearlyRate: percentageMapper('Proposed maximum yearly rate'),
  minAmmSlope: amountMapper('Proposed minimum AMM slope'),
  minSaleDuration: blocksMapper('Proposed minimum sale duration'),
  minRevenueSplitDuration: blocksMapper('Proposed minimum revenue split duration'),
  minRevenueSplitTimeToStart: blocksMapper('Proposed minimum revenue split time to start'),
  salePlatformFee: percentageMapper('Proposed sale platform fee'),
  ammBuyTxFees: percentageMapper('Proposed AMM buy transaction fees'),
  ammSellTxFees: percentageMapper('Proposed AMM sell transaction fees'),
  bloatBond: amountMapper('Proposed bloat bond'),

  // UpdateArgoBridgeConstraints
  operatorAccount: addressMapper('Operator Account'),
  pauserAccounts: addressesMapper('Pauser Accounts'),
  bridgingFee: amountMapper('Proposed bridging fee'),
  thawnDuration: blocksMapper('Proposed thawn duration'),
  remoteChains: listMapper('Remote Chains'),
}

const mapProposalDetail = (key: ProposalDetailsKeys, proposalDetails: ProposalWithDetails['details']) => {
  const value = proposalDetails[key as keyof typeof proposalDetails]

  if (percentageProposalsAmount.includes(proposalDetails.type as ProposalType) && key === 'amount') {
    return percentageMapper('Proposed referral cut')((value as any).toNumber(), proposalDetails.type)
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
    updateChannelPayouts: [
      'channelCashoutsEnabled',
      'minCashoutAllowed',
      'maxCashoutAllowed',
      'payloadHash',
      'payloadDataObjectId',
    ],
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
