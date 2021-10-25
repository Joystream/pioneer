import { ElectedCouncilOrderByInput } from '@/common/api/queries'
import { useGetPastCouncilsQuery } from '@/council/queries'
import { asPastCouncil } from '@/council/types/PastCouncil'

export const usePastCouncils = () => {
  const { loading, data } = useGetPastCouncilsQuery({
    variables: { orderBy: ElectedCouncilOrderByInput.CreatedAtDesc },
  })

  return { isLoading: loading, councils: data?.electedCouncils.map(asPastCouncil) }
}
