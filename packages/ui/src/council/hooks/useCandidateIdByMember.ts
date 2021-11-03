import { useGetCurrentCandidateIdByMemberQuery } from '../queries'

export const useCandidateIdByMember = (memberId: string) => {
  const { data, loading } = useGetCurrentCandidateIdByMemberQuery({ variables: { memberId } })
  console.debug(data, loading)
  return {
    isLoading: !!(data?.candidates.length && !loading),
    candidateId: data?.candidates[0]?.id,
  }
}
