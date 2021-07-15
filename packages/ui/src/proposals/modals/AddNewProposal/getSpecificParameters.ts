import { ApiRx } from '@polkadot/api'

import { isValidSpecificParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { SpecificParametersContext } from '@/proposals/modals/AddNewProposal/machine'
import { ProposalType } from '@/proposals/types'

export const getSpecificParameters = (
  api: ApiRx,
  type: ProposalType | undefined,
  specifics: SpecificParametersContext['specifics']
): any => {
  if (!type || !isValidSpecificParameters(type, specifics)) {
    return { Signal: '' }
  }

  switch (type) {
    case 'fundingRequest':
      return {
        FundingRequest: [{ ...specifics, account: specifics.account?.address }],
      }
    default:
      return { Signal: '' }
  }
}
