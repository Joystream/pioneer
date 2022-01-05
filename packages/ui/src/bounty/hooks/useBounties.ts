import { useMemo } from 'react'

import { useGetBountiesCountQuery, useGetBountiesQuery } from '@/bounty/queries'
import { BountyOrderByInput, BountyStage, BountyWhereInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'

import { BountyFiltersState } from '../components/BountiesFilters'
import { asBounty } from '../types/casts'

interface UseBountiesProps {
  order: SortOrder<BountyOrderByInput>
  perPage?: number
  filters?: BountyFiltersState
}

export const useBounties = ({ order, perPage = 10, filters }: UseBountiesProps) => {
  const orderBy = toQueryOrderByInput<BountyOrderByInput>(order)
  const { data: dataCount } = useGetBountiesCountQuery()
  const totalCountPerPage = dataCount?.bountiesConnection.totalCount
  const { offset, pagination } = usePagination(perPage, totalCountPerPage ?? 0, [order])

  const variables = useMemo(() => {
    const where: BountyWhereInput = {}

    if (filters?.search) {
      where.title_contains = filters.search
    }

    if (filters?.period) {
      switch (filters.period) {
        case 'funding':
          where.stage_eq = BountyStage['Funding']
          break
        case 'working':
          where.stage_eq = BountyStage['WorkSubmission']
          break
        case 'judgement':
          where.stage_eq = BountyStage['Judgment']
          break
        case 'expired':
          where.stage_eq = BountyStage['Expired']
          break
        case 'withdrawal':
          where.OR = [{ stage_eq: BountyStage['Successful'] }, { stage_eq: BountyStage['Failed'] }]
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
  }, [JSON.stringify(filters)])

  const { loading, data } = useGetBountiesQuery({ variables })

  return {
    isLoading: loading,
    bounties: data?.bounties.map(asBounty) ?? [],
    pagination: pagination,
  }
}
