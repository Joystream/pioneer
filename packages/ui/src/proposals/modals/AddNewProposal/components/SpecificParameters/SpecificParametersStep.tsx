import React from 'react'
import { State, Typestate } from 'xstate'

import { CreateWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/CreateWorkingGroupLeadOpening'
import { FundingRequest } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/FundingRequest'
import {
  AddNewProposalContext,
  AddNewProposalEvent,
  AddNewProposalMachineState,
} from '@/proposals/modals/AddNewProposal/machine'

interface SpecificParametersStepProps {
  send: (event: AddNewProposalEvent['type'], payload: any) => void
  state: State<AddNewProposalContext, AddNewProposalEvent, any, Typestate<AddNewProposalContext>>
}

export const isValidSpecificParameters = (state: AddNewProposalMachineState): boolean => {
  switch (true) {
    case state.matches('specificParameters.fundingRequest'): {
      const specifics = state.context.specifics

      return !!(specifics?.amount && specifics.amount.gtn(0) && specifics.account)
    }
    case state.matches('specificParameters.createWorkingGroupLeadOpening.workingGroupAndOpeningDetails'): {
      const specifics = state.context.specifics

      return !!(specifics?.groupId && specifics.description && specifics.shortDescription)
    }
    default:
      return false
  }
}

export const SpecificParametersStep = ({ send, state }: SpecificParametersStepProps) => {
  switch (true) {
    case state.matches('specificParameters.fundingRequest'):
      return (
        <FundingRequest
          account={state.context.specifics?.account}
          amount={state.context.specifics?.amount}
          setAccount={(account) => send('SET_ACCOUNT', { account })}
          setAmount={(amount) => send('SET_AMOUNT', { amount })}
        />
      )
    case state.matches('specificParameters.createWorkingGroupLeadOpening.workingGroupAndOpeningDetails'):
      return (
        <CreateWorkingGroupLeadOpening
          description={state.context.specifics?.description}
          shortDescription={state.context.specifics?.shortDescription}
          groupId={state.context.specifics?.groupId}
          setDescription={(description) => send('SET_DESCRIPTION', { description })}
          setShortDescription={(shortDescription) => send('SET_SHORT_DESCRIPTION', { shortDescription })}
          setGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
        />
      )
    default:
      return null
  }
}
