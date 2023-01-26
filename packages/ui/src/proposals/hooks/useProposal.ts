import { useGetProposalQuery } from '@/proposals/queries'
import { asProposalWithDetails, ProposalWithDetails } from '@/proposals/types'

interface UseProposal {
  isLoading: boolean
  proposal: ProposalWithDetails | null
}

export const useProposal = (id: string): UseProposal => {
  const params = { variables: { where: { id: id } } }

  const { loading, data } = useGetProposalQuery(params)

  return {
    isLoading: loading,
    proposal: data && data.proposal ? asProposalWithDetails(data.proposal) : null,
  }
}
