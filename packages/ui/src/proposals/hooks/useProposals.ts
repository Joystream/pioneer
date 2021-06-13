import { useGetProposalsQuery } from '@/proposals/queries'
import { asProposal, Proposal } from '@/proposals/types'

interface UseProposals {
  isLoading: boolean
  proposals: Proposal[]
}

export const useProposals = (): UseProposals => {
  const { loading, data } = useGetProposalsQuery()

  console.log('llellele', data)
  return {
    isLoading: loading,
    proposals: data && data.proposals ? data.proposals.map(asProposal) : [],
  }
}
