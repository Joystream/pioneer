import { useGetBountiesCountQuery, useGetBountiesQuery } from '@/bounty/queries'
import { BountyOrderByInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'

import { asBounty } from '../types/casts'

interface UseBountiesProps {
  order: SortOrder<BountyOrderByInput>
  perPage?: number
}

export const useBounties = ({ order, perPage = 10 }: UseBountiesProps) => {
  const orderBy = toQueryOrderByInput<BountyOrderByInput>(order)
  const { data: dataCount } = useGetBountiesCountQuery()
  const totalCountPerPage = dataCount?.bountiesConnection.totalCount
  const { offset, pagination } = usePagination(perPage, totalCountPerPage ?? 0, [order])

  const { loading, data } = useGetBountiesQuery({
    variables: { orderBy: orderBy ?? [], limit: perPage, offset: offset },
  })

  return {
    isLoading: loading,
    bounties: data?.bounties.map(asBounty) ?? [],
    pagination: pagination,
  }
}
