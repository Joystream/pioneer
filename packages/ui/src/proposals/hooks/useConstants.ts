import { ApiRx } from '@polkadot/api'
import { useMemo } from 'react'

import { useApi } from '@/common/hooks/useApi'
import { asProposalConstants, ProposalConstants } from '@/proposals/types/constants'

import { ProposalDetails } from '../types'

export const useConstants = (proposalType?: ProposalDetails): ProposalConstants | null => {
  const { api } = useApi()

  return useMemo(() => {
    if (!proposalType) {
      return null
    }

    const constants =
      api?.consts.proposalsCodex[(proposalType + 'ProposalParameters') as keyof ApiRx['consts']['proposalsCodex']]

    return constants ? asProposalConstants(constants) : null
  }, [proposalType])
}
