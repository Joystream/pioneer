import React, { ReactElement } from 'react'

import { ProposalType, ProposalWithDetails } from '../../types'
import { ProposalDetails } from '../../types/ProposalDetails'

import { CreateLeadOpeningDetailsComponent } from './CreateLeadOpeningDetailsComponent'
import { FundingRequestDetailsComponent } from './FundingRequestDetailsComponent'

export interface ProposalPropertiesContent<T extends ProposalType> {
  (props: { details: ProposalDetails & { type: T } }): ReactElement
}

const proposalDetails: Partial<Record<ProposalType, ProposalPropertiesContent<any>>> = {
  fundingRequest: FundingRequestDetailsComponent,
  createWorkingGroupLeadOpening: CreateLeadOpeningDetailsComponent,
}

interface Props {
  proposal: ProposalWithDetails
}

export const ProposalProperties = ({ proposal }: Props) => {
  const Content = proposal.details.type && proposalDetails[proposal.details.type]
  if (Content) {
    return <Content details={proposal.details} />
  }
  return null
}
