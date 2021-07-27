import { useMemo } from 'react'

import { ProposalWhereInput } from '@/common/api/queries'
import {
  proposalActiveStatuses,
  proposalPastStatuses,
  proposalStatusToTypename,
} from '@/proposals/model/proposalStatus'
import { useGetProposalsQuery } from '@/proposals/queries'
import { asProposal, Proposal, ProposalStatus } from '@/proposals/types'

import { ProposalFiltersState } from '../components/ProposalFilters'

type UseProposalsStatus = 'active' | 'past'

export interface UseProposalsProps {
  status: UseProposalsStatus
  filters?: ProposalFiltersState
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

export const useProposals = ({ status, filters }: UseProposalsProps): UseProposals => {
  const variables = useMemo(() => {
    let where: ProposalWhereInput = {
      status_json: filters?.stage
        ? { isTypeOf_eq: proposalStatusToTypename(filters.stage as ProposalStatus) }
        : getStatusWhere(status),
    }
    if (filters?.type) where.details_json = { isTypeOf_eq: filters.type + 'ProposalDetails' }
    if (filters?.proposer) where.creator = { id_eq: filters.proposer.id }
    if (filters?.search) where.title_contains = filters.search
    if (filters?.lifetime) {
      const lifetime = filters.lifetime
      if ('start' in lifetime && 'end' in lifetime) {
        const baseWhere = where
        where = {
          ...baseWhere,
          createdAt_lte: lifetime.end,
          OR: [
            {
              ...baseWhere,
              statusSetAtTime_gte: lifetime.start,
            },
            {
              ...baseWhere,
              createdAt_lte: lifetime.start,
              statusSetAtTime_gte: lifetime.end,
            },
          ],
        }
      } else if ('start' in lifetime) {
        where.statusSetAtTime_gte = lifetime.start
      } else {
        where.createdAt_lte = lifetime.end
      }
    }
    return { where }
  }, [status, JSON.stringify(filters)])

  const { loading, data } = useGetProposalsQuery({ variables })

  return {
    isLoading: loading,
    proposals: data && data.proposals ? data.proposals.map(asProposal) : [],
  }
}
