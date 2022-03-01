import { ApolloQueryResult } from '@apollo/client'

import { useGetProposalQuery } from '@/proposals/queries'
import { asProposalWithDetails, ProposalWithDetails } from '@/proposals/types'

interface UseProposal {
  isLoading: boolean
  proposal: ProposalWithDetails | null
  refetch: () => Promise<ApolloQueryResult<unknown>>
}

export const useProposal = (id: string): UseProposal => {
  const params = { variables: { where: { id: id } } }

  const { loading, data, refetch } = useGetProposalQuery(params)

  return {
    isLoading: loading,
    proposal: data && data.proposal ? asProposalWithDetails(data.proposal) : null,
    refetch,
  }
}
