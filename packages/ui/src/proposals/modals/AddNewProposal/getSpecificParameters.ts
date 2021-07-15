import { ApiRx } from '@polkadot/api'

import { isValidSpecificParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { SpecificParametersContext } from '@/proposals/modals/AddNewProposal/machine'
import { ProposalType } from '@/proposals/types'

export const getSpecificParameters = (
  api: ApiRx,
  type: ProposalType | undefined,
  context: SpecificParametersContext['specifics']
): any => {
  if (!type || !isValidSpecificParameters(type, context)) {
    return { Signal: '' }
  }

  switch (type) {
    case 'fundingRequest':
      return {
        FundingRequest: [{ ...context, account: context.account?.address }],
      }
    default:
      return { Signal: '' }
  }
}
