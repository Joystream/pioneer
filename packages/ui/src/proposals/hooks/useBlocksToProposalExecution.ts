import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { Block } from '@/common/types'
import { ProposalDetailed, ProposalConstants } from '@/proposals/types'

const estimableStatus = ['gracing', 'deciding']

export const useBlocksToProposalExecution = (
  proposal: ProposalDetailed | null,
  constants: ProposalConstants | null
) => {
  const currentBlockNumber = useCurrentBlockNumber()

  if (!currentBlockNumber || !proposal || !estimableStatus.includes(proposal.status)) {
    return
  }

  const blocksUntil = ({ number }: Block) => number - currentBlockNumber.toNumber()

  if (proposal.exactExecutionBlock) {
    return blocksUntil(proposal.exactExecutionBlock)
  } else if (constants) {
    const periodKey = proposal.status === 'deciding' ? 'votingPeriod' : 'gracePeriod'
    const period = constants[periodKey]
    return blocksUntil(proposal.statusSetAtBlock) + period
  }
}
