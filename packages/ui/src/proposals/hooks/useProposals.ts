import {
  proposalActiveStatuses,
  proposalPastStatuses,
  proposalStatusToTypename,
} from '@/proposals/model/proposalStatus'
import { useGetProposalsQuery } from '@/proposals/queries'
import { asProposal, Proposal } from '@/proposals/types'

type UseProposalsStatus = 'active' | 'past'

interface UseProposalsProps {
  status: UseProposalsStatus
}

interface UseProposals {
  isLoading: boolean
  proposals: Proposal[]
}

export const getStatusWhere = (status: UseProposalsStatus) => {
  if (!status) {
    return
  }

  const seekedStatuses = status === 'active' ? proposalActiveStatuses : proposalPastStatuses
  return { isTypeOf_in: seekedStatuses.map(proposalStatusToTypename) }
}

export const useProposals = ({ status }: UseProposalsProps): UseProposals => {
  const variables = {
    where: { status_json: getStatusWhere(status) },
  }

  const { loading, data } = useGetProposalsQuery({ variables })

  return {
    isLoading: loading,
    proposals: data && data.proposals ? data.proposals.map(asProposal) : [],
  }
}
