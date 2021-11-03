import { useGetCurrentCandidateIdByMemberQuery } from '../queries'

export const useCandidateIdByMember = (memberId: string) => {
  const { data, loading } = useGetCurrentCandidateIdByMemberQuery({ variables: { memberId } })
  return {
    isLoading: loading,
    candidateId: data?.candidates[0]?.id,
  }
}
