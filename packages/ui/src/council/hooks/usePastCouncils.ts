import { ElectedCouncilOrderByInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'
import { useGetPastCouncilsCountQuery, useGetPastCouncilsQuery } from '@/council/queries'
import { asPastCouncil } from '@/council/types/PastCouncil'

interface UsePastCouncilsProps {
  order: SortOrder<ElectedCouncilOrderByInput>
  perPage?: number
}

export const usePastCouncils = ({ order, perPage = 10 }: UsePastCouncilsProps) => {
  const orderBy = toQueryOrderByInput<ElectedCouncilOrderByInput>(order)
  const { data: dataCount } = useGetPastCouncilsCountQuery()
  const totalCountPerPage = dataCount?.electedCouncilsConnection.totalCount
  const { offset, pagination } = usePagination(perPage, totalCountPerPage ?? 0, [order])

  const { loading, data } = useGetPastCouncilsQuery({
    variables: { orderBy: orderBy ?? [], limit: perPage, offset: offset },
  })

  return {
    isLoading: loading,
    councils: data?.electedCouncils.map(asPastCouncil),
    pagination: pagination,
  }
}
