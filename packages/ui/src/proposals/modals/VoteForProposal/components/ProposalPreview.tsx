import React from 'react'

import {camelCaseToText} from '@/common/helpers'
import getDetailsRenderStructure from '@/proposals/helpers/getDetailsRenderStructure'
import {ProposalWithDetails} from '@/proposals/types'

import {NormalTextDetails} from './detailsRenderers'

interface Props {
  proposalTitle: string
  proposalType: string
  proposalRationale: string
  proposalDetails?: ProposalWithDetails['details']
}

export const ProposalPreview = ({
  proposalTitle,
  proposalType,
  proposalRationale,
  proposalDetails,
}: Props) => {
  const detailsRenderStructure = getDetailsRenderStructure(proposalDetails)
  console.log({ detailsRenderStructure })
  return (
    <>
      <h5>{proposalTitle}</h5>
      <h6>{proposalType && `${camelCaseToText(proposalType)}:`}</h6>
      {proposalRationale && <NormalTextDetails label="rationale" value={proposalRationale} />}
    </>
  )
}
