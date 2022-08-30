import React, { ReactElement, useCallback, useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { StatisticsThreeColumns } from '@/common/components/statistics'
import { useObservable } from '@/common/hooks/useObservable'
import { Percentage } from '@/proposals/components/ProposalDetails/renderers/Percentage'
import getDetailsRenderStructure, { RenderNode, RenderType } from '@/proposals/helpers/getDetailsRenderStructure'
import { ProposalWithDetails } from '@/proposals/types'

import {
  Address,
  Amount,
  RuntimeBlob,
  Markdown,
  Member,
  NumberOfBlocks,
  Text,
  Divider,
  Numeric,
  ProposalLink,
  OpeningLink,
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
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [api])
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

    return []
  }, [membershipPrice])

  if (!proposalDetails) {
    return null
  }

  return (
    <StatisticsThreeColumns>
      {[...(detailsRenderStructure?.structure ?? []), ...additionalDetails].map(renderProposalDetail)}
    </StatisticsThreeColumns>
  )
}
