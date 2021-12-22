import React, { ReactElement, useCallback, useMemo } from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { camelCaseToText } from '@/common/helpers'
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
  Numeric,
  ProposalLink,
  OpeningLink,
} from './renderers'

interface Props {
  proposalTitle: string
  proposalType: string
  proposalRationale: string
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
  ProposalLink: ProposalLink,
  OpeningLink: OpeningLink,
}

export const ProposalPreview = ({ proposalTitle, proposalType, proposalRationale, proposalDetails }: Props) => {
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

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h5>{proposalTitle}</h5>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={8}>
          <h6>{proposalType && `${camelCaseToText(proposalType)}`}</h6>
        </RowGapBlock>
      </Row>
      {detailsRenderStructure?.structure?.map(renderProposalDetail)}
      {proposalRationale && <Markdown label="rationale" value={proposalRationale} />}
    </RowGapBlock>
  )
}
