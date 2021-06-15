import { useGetProposalQuery } from '@/proposals/queries'
import { asProposal, Proposal } from '@/proposals/types'

interface UseProposal {
  isLoading: boolean
  proposal: Proposal | null
}

export const useProposal = (id: string): UseProposal => {
  const params = { variables: { where: { id: id } } }

  const { loading, data } = useGetProposalQuery(params)

  return {
    isLoading: loading,
    proposal: data && data.proposal ? asProposal(data.proposal) : null,
  }
}
