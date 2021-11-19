import React, { ReactElement, useCallback, useMemo } from 'react'

import { StatisticsThreeColumns } from '@/common/components/statistics'
import getDetailsRenderStructure, { RenderNode, RenderType } from '@/proposals/helpers/getDetailsRenderStructure'
import { ProposalWithDetails } from '@/proposals/types'

import { Address, Amount, RuntimeBlob, Markdown, Member, NumberOfBlocks, Text, Divider } from './renderers'

interface Props {
  proposalDetails?: ProposalWithDetails['details']
}

export interface ProposalDetailContent {
  (props: { label: string; value: any }): ReactElement
}

const renderTypeMapper: Partial<Record<RenderType, ProposalDetailContent>> = {
  Text: Text,
  Amount: Amount,
  NumberOfBlocks: NumberOfBlocks,
  Markdown: Markdown,
  Member: Member,
  Address: Address,
  RuntimeBlob: RuntimeBlob,
  Divider: Divider,
}

export const ProposalDetails = ({ proposalDetails }: Props) => {
  const renderProposalDetail = useCallback((detail: RenderNode, index: number) => {
    const Component = renderTypeMapper[detail.renderType]
    if (Component) {
      return <Component label={detail.label || ''} value={detail.value} key={index} />
    }

    return null
  }, [])
  const detailsRenderStructure = useMemo(() => getDetailsRenderStructure(proposalDetails), [proposalDetails])

  if (!proposalDetails) {
    return null
  }

  return <StatisticsThreeColumns>{detailsRenderStructure?.structure?.map(renderProposalDetail)}</StatisticsThreeColumns>
}
