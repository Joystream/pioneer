import { useGetPastCouncilQuery } from '@/council/queries'
import { asPastCouncilWithDetails } from '@/council/types/PastCouncil'

export const usePastCouncil = (id: string) => {
  const { loading, data } = useGetPastCouncilQuery({ variables: { id } })

  return {
    isLoading: loading,
    council: data && data.electedCouncilByUniqueInput && asPastCouncilWithDetails(data.electedCouncilByUniqueInput),
  }
}
