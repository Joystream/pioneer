import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const useHasMemberVotedOnProposal = (proposalId: string, memberId?: string) => {
  const { api } = useApi()
  const voteStatusSize = useObservable(
    memberId
      ? api?.query.proposalsEngine.voteExistsByProposalByVoter.size(parseInt(proposalId), parseInt(memberId))
      : undefined,
    [memberId]
  )
  return voteStatusSize?.gtn(0)
}
