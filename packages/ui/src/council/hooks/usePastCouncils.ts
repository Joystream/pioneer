import { ElectedCouncilOrderByInput } from '@/common/api/queries'
import { getSortFromEnum, OrderKey, SortOrder } from '@/common/hooks/useSort'
import { useGetPastCouncilsQuery } from '@/council/queries'
import { asPastCouncil } from '@/council/types/PastCouncil'

interface UsePastCouncilsProps {
  page?: number
  order: SortOrder<OrderKey<ElectedCouncilOrderByInput>>
}

export const usePastCouncils = ({ order }: UsePastCouncilsProps) => {
  const orderBy = getSortFromEnum<ElectedCouncilOrderByInput>(order)

  const { loading, data } = useGetPastCouncilsQuery({
    variables: { orderBy: orderBy ?? [] },
  })

  return { isLoading: loading, councils: data?.electedCouncils.map(asPastCouncil) }
}
