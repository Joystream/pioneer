import { useGetProposalQuery } from '@/proposals/queries'
import { asDetailedProposal, ProposalDetailed } from '@/proposals/types'

interface UseProposal {
  isLoading: boolean
  proposal: ProposalDetailed | null
}

export const useProposal = (id: string): UseProposal => {
  const params = { variables: { where: { id: id } } }

  const { loading, data } = useGetProposalQuery(params)

  return {
    isLoading: loading,
    proposal: data && data.proposal ? asDetailedProposal(data.proposal) : null,
  }
}
