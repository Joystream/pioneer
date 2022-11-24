import { useMemo } from 'react'

import { ProposalOrderByInput, ProposalWhereInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'
import { proposalStatusToTypename } from '@/proposals/model/proposalStatus'
import { useGetProposalsCountQuery, useGetProposalsQuery } from '@/proposals/queries'
import { asProposal, Proposal, ProposalStatus } from '@/proposals/types'

import { ProposalFiltersState } from '../components/ProposalFilters'

type UseProposalsStatus = 'active' | 'past'

export interface UseProposalsProps {
  order?: SortOrder<ProposalOrderByInput>
  status: UseProposalsStatus
  filters?: Partial<ProposalFiltersState>
  perPage?: number
  fetchAll?: boolean
}

interface UseProposals {
  isLoading: boolean
  proposals: Proposal[]
  pagination: ReturnType<typeof usePagination>['pagination']
  allCount?: number
}

export const useProposals = ({
  order,
  status,
  filters,
  perPage = 10,
  fetchAll = false,
}: UseProposalsProps): UseProposals => {
  const orderBy = order ? toQueryOrderByInput<ProposalOrderByInput>(order) : ProposalOrderByInput.CreatedAtDesc

  const where = useMemo(() => {
    const where: ProposalWhereInput = filters?.stage
      ? { status_json: { isTypeOf_eq: proposalStatusToTypename(filters.stage as ProposalStatus) } }
      : { isFinalized_eq: status === 'past' }

    if (filters?.type) where.details_json = { isTypeOf_eq: filters.type + 'ProposalDetails' }
    if (filters?.proposer) where.creator = { id_eq: filters.proposer.id }
    if (filters?.search) where.title_contains = filters.search
    if (filters?.lifetime) {
      const lifetime = filters.lifetime
      if ('start' in lifetime && 'end' in lifetime) {
        where.OR = [
          {
            statusSetAtTime_gte: lifetime.start,
            statusSetAtTime_lte: lifetime.end,
          },
          {
            createdAt_gte: lifetime.start,
            createdAt_lte: lifetime.end,
          },
          {
            createdAt_lte: lifetime.start,
            statusSetAtTime_gte: lifetime.end,
          },
        ]
      } else if ('start' in lifetime) {
        where.statusSetAtTime_gte = lifetime.start
      } else {
        where.createdAt_lte = lifetime.end
      }
    }
    return where
  }, [status, JSON.stringify(filters)])
  const { data: proposalCount } = useGetProposalsCountQuery({ variables: { where } })
  const { offset, pagination } = usePagination(perPage, proposalCount?.proposalsConnection.totalCount ?? 0, [])
  const paginationVariables = fetchAll ? {} : { offset, limit: perPage }
  const { loading, data } = useGetProposalsQuery({ variables: { ...paginationVariables, where, orderBy } })

  return {
    isLoading: loading,
    pagination,
    proposals: data && data.proposals ? data.proposals.map(asProposal) : [],
    allCount: proposalCount?.proposalsConnection.totalCount,
  }
}
