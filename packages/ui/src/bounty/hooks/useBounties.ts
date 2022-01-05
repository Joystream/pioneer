import { useMemo } from 'react'

import { useGetBountiesCountQuery, useGetBountiesQuery } from '@/bounty/queries'
import { BountyOrderByInput, BountyStage, BountyWhereInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'

import { BountyFiltersState } from '../components/BountiesFilters'
import { asBounty } from '../types/casts'

type BountyStatus = 'active' | 'past'

interface UseBountiesProps {
  order: SortOrder<BountyOrderByInput>
  perPage?: number
  filters?: BountyFiltersState
  status: BountyStatus
}

export const useBounties = ({ order, perPage = 10, filters, status }: UseBountiesProps) => {
  const orderBy = toQueryOrderByInput<BountyOrderByInput>(order)
  const { data: dataCount } = useGetBountiesCountQuery()
  const totalCountPerPage = dataCount?.bountiesConnection.totalCount
  const { offset, pagination } = usePagination(perPage, totalCountPerPage ?? 0, [order])

  const variables = useMemo(() => {
    const where: BountyWhereInput = {}

    if (filters?.search) {
      where.title_contains = filters.search
    }

    if (status === 'past') {
      where.stage_eq = BountyStage['Terminated']
    }

    if (filters?.period) {
      switch (filters?.period) {
        case 'Funding':
          where.stage_eq = BountyStage['Funding']
          break
        case 'Working':
          where.stage_eq = BountyStage['WorkSubmission']
          break
        case 'Judgement':
          where.stage_eq = BountyStage['Judgment']
          break
        case 'Expired':
          where.stage_eq = BountyStage['Expired']
          break
        case 'Withdrawal':
          where.stage_in = [BountyStage['Successful'], BountyStage['Failed']]
          break
      }
    }

    if (filters?.creator) {
      where.creator = { id_eq: filters.creator.id }
    }

    if (filters?.oracle) {
      where.oracle = { id_eq: filters.oracle.id }
    }

    return { where, orderBy, limit: perPage, offset }
  }, [status, JSON.stringify(filters)])

  const { loading, data } = useGetBountiesQuery({ variables })

  return {
    isLoading: loading,
    bounties: data?.bounties.map(asBounty) ?? [],
    pagination: pagination,
  }
}
