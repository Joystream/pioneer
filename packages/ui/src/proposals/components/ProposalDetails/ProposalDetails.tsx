import React, { ReactElement, useCallback, useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { Info } from '@/common/components/Info'
import { StatisticsThreeColumns } from '@/common/components/statistics'
import { TooltipContentProp } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useCouncilStatistics } from '@/council/hooks/useCouncilStatistics'
import { Percentage } from '@/proposals/components/ProposalDetails/renderers/Percentage'
import getDetailsRenderStructure, { RenderNode, RenderType } from '@/proposals/helpers/getDetailsRenderStructure'
import { ProposalWithDetails, UpdateGroupBudgetDetails } from '@/proposals/types'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

import {
  Address,
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

interface Props {
  proposalDetails?: ProposalWithDetails['details']
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
  Percentage: Percentage,
  Hash: Hash,
  DestinationsPreview: DestinationsPreview,
}

export const ProposalDetails = ({ proposalDetails }: Props) => {
  const { api } = useApi()
  const { budget } = useCouncilStatistics()
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

    if (proposalDetails?.type === 'fundingRequest') {
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

    return []
  }, [membershipPrice, !group, budget])

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

  if (!proposalDetails) {
    return null
  }

  return (
    <>
      <StatisticsThreeColumns>
        {[...(detailsRenderStructure?.structure ?? []), ...additionalDetails].map(renderProposalDetail)}
      </StatisticsThreeColumns>
      {extraInformation}
    </>
  )
}
