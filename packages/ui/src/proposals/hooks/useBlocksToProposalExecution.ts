import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { ProposalWithDetails, ProposalConstants, ProposalMention, LatestProposal } from '@/proposals/types'

const estimableStatus = ['gracing', 'deciding']

export const useBlocksToProposalExecution = (
  proposal: ProposalWithDetails | ProposalMention | LatestProposal | null | undefined,
  constants: ProposalConstants | null
) => {
  const currentBlockNumber = useCurrentBlockNumber()

  if (!currentBlockNumber || !proposal || !estimableStatus.includes(proposal.status)) {
    return
  }

  const blocksUntil = (number: number) => number - currentBlockNumber.toNumber()

  if (proposal.exactExecutionBlock) {
    return blocksUntil(proposal.exactExecutionBlock)
  } else if (constants) {
    const periodKey = proposal.status === 'deciding' ? 'votingPeriod' : 'gracePeriod'
    const period = constants[periodKey]
    return blocksUntil(proposal.statusSetAtBlock.number) + period
  }
}
