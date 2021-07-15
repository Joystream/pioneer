import { ApiRx } from '@polkadot/api'

import { isValidSpecificParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'

export const getSpecificParameters = (api: ApiRx, state: AddNewProposalMachineState): any => {
  if (!isValidSpecificParameters(state)) {
    return { Signal: '' }
  }

  switch (state.context.type) {
    case 'fundingRequest':
      return {
        FundingRequest: [{ ...state.context, account: state.context?.specifics?.account?.address }],
      }
    default:
      return { Signal: '' }
  }
}
