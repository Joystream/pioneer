import { ApiRx } from '@polkadot/api'

import { useApi } from '@/common/hooks/useApi'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { Block } from '@/common/types'

import { Proposal } from '../types'

type ProposalParameterKey = keyof ApiRx['consts']['proposalsCodex']

const estimableStatus = ['gracing', 'deciding']

export const useBlocksToProposalExecution = (proposal: Proposal | null) => {
  const currentBlockNumber = useCurrentBlockNumber()
  const { api } = useApi()

  if (!currentBlockNumber || !proposal || !estimableStatus.includes(proposal.status)) {
    return
  }

  const blocksUntil = ({ number }: Block) => number - currentBlockNumber.toNumber()

  if (proposal.exactExecutionBlock) {
    return blocksUntil(proposal.exactExecutionBlock)
  } else if (api) {
    const detailsParameters = `${proposal.details}ProposalParameters` as ProposalParameterKey
    const periodKey = proposal.status === 'deciding' ? 'votingPeriod' : 'gracePeriod'
    const period = api.consts.proposalsCodex[detailsParameters][periodKey]
    return blocksUntil(proposal.statusSetAtBlock) + period.toNumber()
  }
}
