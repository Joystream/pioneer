import { set } from 'lodash'
import { useMemo } from 'react'

import { useGetBountiesCountQuery, useGetBountiesQuery } from '@/bounty/queries'
import { BountyOrderByInput, BountyStage, BountyWhereInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'

import { BountyFiltersState } from '../components/BountiesFilters'
import { asBounty } from '../types/casts'

export type BountyStatus = 'active' | 'past'

export interface QueryExtraFilter<T> {
  path: string
  value: T
}

export interface UseBountiesProps {
  order?: SortOrder<BountyOrderByInput>
  perPage?: number
  filters?: BountyFiltersState
  status: BountyStatus
  extraFilter?: QueryExtraFilter<unknown>
}

export const useBounties = ({ order, perPage = 10, filters, status, extraFilter }: UseBountiesProps) => {
  const orderBy = order ? toQueryOrderByInput<BountyOrderByInput>(order) : BountyOrderByInput.CreatedAtDesc

  const variables = useMemo(() => {
    const where: BountyWhereInput = {}

    if (filters?.search) {
      where.title_contains = filters.search
    }

    where.isTerminated_eq = status === 'past'

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
        case 'Terminated-funding':
          where.stage_eq = BountyStage['Funding']
          break
        case 'Terminated-failed':
          where.stage_eq = BountyStage['Failed']
          break
        case 'Terminated-successful':
          where.stage_eq = BountyStage['Successful']
          break
      }
    }

    if (filters?.creator) {
      where.creator = { id_eq: filters.creator.id }
    }

    if (filters?.oracle) {
      where.oracle = { id_eq: filters.oracle.id }
    }

    if (extraFilter) {
      set(where, extraFilter.path, extraFilter.value)
    }

    return { where, orderBy }
  }, [status, JSON.stringify(filters), extraFilter?.path, JSON.stringify(extraFilter?.value)])

  const { data: dataCount } = useGetBountiesCountQuery({ variables })
  const totalCountPerPage = dataCount?.bountiesConnection.totalCount

  const { offset, pagination } = usePagination(perPage, totalCountPerPage ?? 0, [order])

  const { loading, data } = useGetBountiesQuery({ variables: { ...variables, offset, limit: perPage } })

  return {
    isLoading: loading,
    bounties: data?.bounties.map(asBounty) ?? [],
    pagination: pagination,
  }
}
