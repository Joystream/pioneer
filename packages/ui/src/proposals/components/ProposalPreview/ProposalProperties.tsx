import React, { ReactElement } from 'react'

import { ProposalType, ProposalWithDetails } from '../../types'
import { ProposalDetails } from '../../types/ProposalDetails'

import { FundingRequestDetails } from './FundingRequestDetails'

export interface ProposalPropertiesContent<T extends ProposalType> {
  (props: { details: ProposalDetails & { type: T } }): ReactElement
}

const proposalDetails: Partial<Record<ProposalType, ProposalPropertiesContent<any>>> = {
  fundingRequest: FundingRequestDetails,
}

interface Props {
  proposal: ProposalWithDetails
}

export const ProposalProperties = ({ proposal }: Props) => {
  const Content = proposalDetails[proposal.details.type]
  if (Content) {
    return <Content details={proposal.details} />
  }
  return null
}
