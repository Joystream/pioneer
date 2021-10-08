import { useGetCandidateQuery } from '../queries'
import { asCandidateWithDetails } from '../types'

export const useCandidate = (id: string) => {
  const { data, loading } = useGetCandidateQuery({ variables: { where: { id } } })
  const candidate = data?.candidateByUniqueInput ? asCandidateWithDetails(data?.candidateByUniqueInput) : undefined
  return {
    isLoading: loading,
    candidate,
  }
}
