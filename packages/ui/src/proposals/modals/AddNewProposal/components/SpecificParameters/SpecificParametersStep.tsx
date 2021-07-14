import React from 'react'

import { CreateWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/CreateWorkingGroupLeadOpening'
import { FundingRequest } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/FundingRequest'
import { AddNewProposalEvent, SpecificParametersContext } from '@/proposals/modals/AddNewProposal/machine'
import { ProposalConstants, ProposalType } from '@/proposals/types'

interface SpecificParametersStepProps {
  constants: ProposalConstants
  params: SpecificParametersContext
  send: (event: AddNewProposalEvent['type'], payload: any) => void
}

export const isValidSpecificParameters = (
  type: ProposalType,
  context: SpecificParametersContext['specifics']
): boolean => {
  switch (type) {
    case 'fundingRequest':
      return !!(context.amount && context.amount.gtn(0) && context.account)
    default:
      return false
  }
}

export const SpecificParametersStep = ({ constants, params, send }: SpecificParametersStepProps) => {
  switch (params.type) {
    case 'fundingRequest':
      return (
        <FundingRequest
          account={params.specifics.account}
          amount={params.specifics.amount}
          setAccount={(account) => send('SET_ACCOUNT', { account })}
          setAmount={(amount) => send('SET_AMOUNT', { amount })}
        />
      )
    case 'createWorkingGroupLeadOpening':
      return <CreateWorkingGroupLeadOpening />
    default:
      return null
  }
}
