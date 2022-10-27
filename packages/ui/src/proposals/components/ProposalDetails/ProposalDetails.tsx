import React, { ReactElement, useCallback, useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { StatisticsThreeColumns } from '@/common/components/statistics'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useCouncilStatistics } from '@/council/hooks/useCouncilStatistics'
import { Percentage } from '@/proposals/components/ProposalDetails/renderers/Percentage'
import getDetailsRenderStructure, { RenderNode, RenderType } from '@/proposals/helpers/getDetailsRenderStructure'
import { ProposalWithDetails, UpdateGroupBudgetDetails } from '@/proposals/types'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

import {
  Address,
  Amount,
  Divider,
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
  (props: { label: string; value: any }): ReactElement
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
}

export const ProposalDetails = ({ proposalDetails }: Props) => {
  const { api } = useApi()
  const { budget } = useCouncilStatistics()
  const { group } = useWorkingGroup({ name: (proposalDetails as UpdateGroupBudgetDetails)?.group?.id })
  const membershipPrice = useFirstObservableValue(() => api?.query.members.membershipPrice(), [api?.isConnected])
  const renderProposalDetail = useCallback((detail: RenderNode, index: number) => {
    const Component = renderTypeMapper[detail.renderType]
    if (Component) {
      return <Component label={detail.label || ''} value={detail.value} key={index} />
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
  }, [membershipPrice, !group])

  if (!proposalDetails) {
    return null
  }

  return (
    <StatisticsThreeColumns>
      {[...(detailsRenderStructure?.structure ?? []), ...additionalDetails].map(renderProposalDetail)}
    </StatisticsThreeColumns>
  )
}
