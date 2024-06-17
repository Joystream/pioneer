import React, { ReactElement, useCallback, useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { Info } from '@/common/components/Info'
import { Statistics } from '@/common/components/statistics'
import { TooltipContentProp } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { Block } from '@/common/types'
import { useCouncilStatistics } from '@/council/hooks/useCouncilStatistics'
import getDetailsRenderStructure, { RenderNode, RenderType } from '@/proposals/helpers/getDetailsRenderStructure'
import { crtConstraints$ } from '@/proposals/model/crtConstraints'
import { ProposalWithDetails, UpdateGroupBudgetDetails } from '@/proposals/types'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

import {
  Address,
  AddressesPreview,
  Amount,
  DestinationsPreview,
  Divider,
  Hash,
  Markdown,
  Member,
  NumberOfBlocks,
  Numeric,
  OpeningLink,
  ProposalLink,
  RuntimeBlob,
  Text,
} from './renderers'
import { BlockTimeDisplay } from './renderers/BlockTimeDisplay'

interface Props {
  proposalDetails?: ProposalWithDetails['details']
  gracePeriod?: number
  exactExecutionBlock?: number
  createdInBlock: Block
}

export interface ProposalDetailContent {
  (props: { label: string; value: any; tooltip?: TooltipContentProp }): ReactElement
}

const renderTypeMapper: Partial<Record<RenderType, ProposalDetailContent>> = {
  Text: Text,
  Amount: Amount,
  Numeric: Numeric,
  NumberOfBlocks: NumberOfBlocks,
  Markdown: Markdown,
  Member: Member,
  Address: Address,
  RuntimeBlob: RuntimeBlob,
  Divider: Divider,
  ProposalLink: ProposalLink,
  OpeningLink: OpeningLink,
  Hash: Hash,
  DestinationsPreview: DestinationsPreview,
  BlockTimeDisplay: BlockTimeDisplay,
  AddressesPreview: AddressesPreview,
}

export const ProposalDetails = ({ proposalDetails, gracePeriod, exactExecutionBlock, createdInBlock }: Props) => {
  const { api } = useApi()
  const { budget } = useCouncilStatistics()

  const validatorRewardMultiplier = useFirstObservableValue(() => {
    if (proposalDetails?.type === 'setEraPayoutDampingFactor') {
      return api?.query.council.eraPayoutDampingFactor()
    }
  }, [api?.isConnected, proposalDetails?.type])

  const { group } = useWorkingGroup({
    name: (proposalDetails as UpdateGroupBudgetDetails)?.group?.id,
  })
  const membershipPrice = useFirstObservableValue(() => api?.query.members.membershipPrice(), [api?.isConnected])
  const renderProposalDetail = useCallback((detail: RenderNode, index: number) => {
    const Component = renderTypeMapper[detail.renderType]
    if (Component) {
      return <Component key={index} {...detail} />
    }

    return null
  }, [])

  const detailsRenderStructure = useMemo(() => getDetailsRenderStructure(proposalDetails), [proposalDetails])

  const crtConstraints = useFirstObservableValue(() => {
    if (api && proposalDetails?.type === 'updateTokenPalletTokenConstraints') {
      return crtConstraints$(api)
    }
  }, [proposalDetails?.type, api?.isConnected])

  const additionalDetails = useMemo(() => {
    if (proposalDetails?.type === 'setReferralCut') {
      return [
        {
          renderType: 'Amount',
          label: 'Current membership price',
          value: membershipPrice ?? 0,
        },
      ] as RenderNode[]
    }

    if (proposalDetails?.type === 'fundingRequest' || proposalDetails?.type === 'decreaseCouncilBudget') {
      return [
        {
          renderType: 'Amount',
          label: 'Current Council Budget',
          value: budget.amount,
        },
      ] as RenderNode[]
    }

    if (proposalDetails?.type === 'updateWorkingGroupBudget') {
      return [
        {
          renderType: 'Amount',
          label: 'Current Council Budget',
          value: budget.amount,
        },
        {
          renderType: 'Amount',
          label: 'Current WG Budget',
          value: group?.budget,
        },
        {
          renderType: 'Amount',
          label: 'Expected WG Budget',
          value: group?.budget?.add(proposalDetails.amount),
        },
      ] as RenderNode[]
    }

    if (proposalDetails?.type === 'setEraPayoutDampingFactor') {
      return [
        {
          renderType: 'Numeric',
          units: '%',
          label: 'Current multiplier',
          value: validatorRewardMultiplier,
        },
      ] as RenderNode[]
    }

    if (proposalDetails?.type === 'updateTokenPalletTokenConstraints') {
      return [
        {
          renderType: 'Numeric',
          label: 'Current maximum yearly rate',
          units: '%',
          value: crtConstraints?.maxYearlyRate,
        },
        {
          renderType: 'Amount',
          label: 'Current minimum AMM slope',
          value: crtConstraints?.minAmmSlope,
        },
        {
          renderType: 'NumberOfBlocks',
          label: 'Current minimum sale duration',
          value: crtConstraints?.minSaleDuration,
        },
        {
          renderType: 'NumberOfBlocks',
          label: 'Current minimum revenue split duration',
          value: crtConstraints?.minRevenueSplitDuration,
        },
        {
          renderType: 'NumberOfBlocks',
          label: 'Current minimum revenue split time to start',
          value: crtConstraints?.minRevenueSplitTimeToStart,
        },
        {
          renderType: 'Numeric',
          label: 'Current sale platform fee',
          units: '%',
          value: crtConstraints?.salePlatformFee,
        },
        {
          renderType: 'Numeric',
          label: 'Current AMM buy transaction fees',
          units: '%',
          value: crtConstraints?.ammBuyTxFees,
        },
        {
          renderType: 'Numeric',
          label: 'Current AMM sell transaction fees',
          units: '%',
          value: crtConstraints?.ammSellTxFees,
        },
        {
          renderType: 'Amount',
          label: 'Current bloat bond',
          value: crtConstraints?.bloatBond,
        },
      ] as RenderNode[]
    }

    return []
  }, [membershipPrice, !group, budget, crtConstraints])

  const extraProposalDetails = useMemo(() => {
    if (exactExecutionBlock) {
      return [
        {
          renderType: 'BlockTimeDisplay',
          label: 'Exact Execution Block',
          value: {
            number: exactExecutionBlock,
            timestamp: new Date(
              new Date(createdInBlock.timestamp).getTime() +
                (exactExecutionBlock - createdInBlock.number) * MILLISECONDS_PER_BLOCK
            ).toString(),
          },
        },
      ] as unknown as RenderNode[]
    }
    if (gracePeriod) {
      return [
        {
          renderType: 'NumberOfBlocks',
          label: 'Gracing Period',
          value: gracePeriod,
        },
      ] as unknown as RenderNode[]
    }
    return []
  }, [exactExecutionBlock, gracePeriod])

  const extraInformation = useMemo(() => {
    if (proposalDetails?.type === 'updateWorkingGroupBudget') {
      const isDecreasing = proposalDetails.amount.isNeg()
      const isValidatingExecutionConstrains = isDecreasing
        ? group?.budget?.lte(proposalDetails.amount.abs())
        : budget.amount?.lt(proposalDetails.amount.abs())
      if (!isValidatingExecutionConstrains) {
        return null
      }

      return (
        <Info>
          <TextMedium>
            {isDecreasing
              ? 'Unless the budget is increase between now and attempted execution, this proposal will fail to execute, and the budget size will not be changed.'
              : 'Unless the Councils budget is increased between now and attempted execution, this proposal will fail to execute, and the budget size will not be changed.'}
          </TextMedium>
        </Info>
      )
    }
    return null
  }, [proposalDetails?.type, budget.amount?.toString(), !group])

  const renderNodes = useMemo(() => {
    const renderStructure = (detailsRenderStructure?.structure ?? []) as RenderNode[]

    if (proposalDetails?.type === 'updateTokenPalletTokenConstraints') {
      return [
        ...[...renderStructure, ...additionalDetails]
          .map((node) => ({
            ...node,
            key: node.label
              .toLowerCase()
              .replace(/^current (.*)./, '$1')
              .replace('proposed ', ''),
          }))
          .sort((a, b) => a.key.localeCompare(b.key)),
        ...extraProposalDetails,
      ]
    }

    return [...renderStructure, ...additionalDetails, ...extraProposalDetails]
  }, [proposalDetails?.type, detailsRenderStructure, additionalDetails, extraProposalDetails])

  if (!proposalDetails) {
    return null
  }

  return (
    <>
      <Statistics>{renderNodes.map(renderProposalDetail)}</Statistics>
      {extraInformation}
    </>
  )
}
