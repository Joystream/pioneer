import React from 'react'

import { FundingRequest } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/FundingRequest'
import { AddNewProposalEvent, SpecificParametersContext } from '@/proposals/modals/AddNewProposal/machine'
import { ProposalConstants } from '@/proposals/types'

interface SpecificParametersStepProps {
  constants: ProposalConstants
  params: SpecificParametersContext
  send: (event: AddNewProposalEvent['type'], payload: any) => void
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
    default:
      return null
  }
}
