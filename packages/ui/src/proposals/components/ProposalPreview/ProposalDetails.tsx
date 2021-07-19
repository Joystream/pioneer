import React, { ReactElement } from 'react'

import { ProposalType } from '../../types'
import { ProposalDetails } from '../../types/ProposalDetails'

import { CreateLeadOpeningDetailsComponent } from './CreateLeadOpeningDetailsComponent'
import { FundingRequestDetailsComponent } from './FundingRequestDetailsComponent'
import { LeadStakeComponent } from './LeadStakeComponent'

export interface ProposalPropertiesContent<T extends ProposalType> {
  (props: { details: ProposalDetails & { type: T } }): ReactElement
}

const proposalDetails: Partial<Record<ProposalType, ProposalPropertiesContent<any>>> = {
  fundingRequest: FundingRequestDetailsComponent,
  createWorkingGroupLeadOpening: CreateLeadOpeningDetailsComponent,
  decreaseWorkingGroupLeadStake: LeadStakeComponent,
  slashWorkingGroupLead: LeadStakeComponent,
}

interface Props {
  details: ProposalDetails
}

export const ProposalDetailsComponent = ({ details }: Props) => {
  const Content = details.type && proposalDetails[details.type]
  if (Content) {
    return <Content details={details} />
  }
  return null
}
