import React, { ReactElement } from 'react'

import { ProposalType } from '../../types'
import { ProposalDetails } from '../../types/ProposalDetails'

import { CreateLeadOpeningDetailsComponent } from './CreateLeadOpeningDetailsComponent'
import { DecreaseLeadStakeComponent } from './DecreaseLeadStakeComponent'
import { FundingRequestDetailsComponent } from './FundingRequestDetailsComponent'

export interface ProposalPropertiesContent<T extends ProposalType> {
  (props: { details: ProposalDetails & { type: T } }): ReactElement
}

const proposalDetails: Partial<Record<ProposalType, ProposalPropertiesContent<any>>> = {
  fundingRequest: FundingRequestDetailsComponent,
  createWorkingGroupLeadOpening: CreateLeadOpeningDetailsComponent,
  decreaseWorkingGroupLeadStake: DecreaseLeadStakeComponent,
}

interface Props {
  details: ProposalDetails
}

export const ProposalProperties = ({ details }: Props) => {
  const Content = details.type && proposalDetails[details.type]
  if (Content) {
    return <Content details={details} />
  }
  return null
}
