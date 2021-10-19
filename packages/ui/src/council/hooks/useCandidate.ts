import { useGetCandidateQuery } from '../queries'
import { asElectionCandidateWithDetails } from '../types'

export const useCandidate = (id: string) => {
  const { data, loading } = useGetCandidateQuery({ variables: { where: { id } } })
  const candidate = data?.candidateByUniqueInput
    ? asElectionCandidateWithDetails(data?.candidateByUniqueInput)
    : undefined
  return {
    isLoading: loading,
    candidate,
  }
}
