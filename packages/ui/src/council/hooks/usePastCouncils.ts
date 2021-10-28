import { ElectedCouncilOrderByInput } from '@/common/api/queries'
import { toQueryOrderByInput, SortOrder } from '@/common/hooks/useSort'
import { useGetPastCouncilsQuery } from '@/council/queries'
import { asPastCouncil } from '@/council/types/PastCouncil'

interface UsePastCouncilsProps {
  page?: number
  order: SortOrder<ElectedCouncilOrderByInput>
}

export const usePastCouncils = ({ order }: UsePastCouncilsProps) => {
  const orderBy = toQueryOrderByInput<ElectedCouncilOrderByInput>(order)

  const { loading, data } = useGetPastCouncilsQuery({
    variables: { orderBy: orderBy ?? [] },
  })

  return { isLoading: loading, councils: data?.electedCouncils.map(asPastCouncil) }
}
