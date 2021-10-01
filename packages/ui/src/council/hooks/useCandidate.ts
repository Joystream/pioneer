import { useGetCandidateQuery } from '../queries'
import { asCandidate } from '../types'

export const useCandidate = (id: string) => {
  const { data, loading } = useGetCandidateQuery({ variables: { where: { id } } })
  const candidate = data?.candidateByUniqueInput ? asCandidate(data?.candidateByUniqueInput) : undefined
  return {
    isLoading: loading,
    candidate,
  }
}
