import { useGetCandidateStatsQuery } from '@/council/queries'

export const useMemberCandidacyStats = (memberId?: string) => {
  const { loading, data } = useGetCandidateStatsQuery({ variables: { memberId } })

  const withdrawn = data?.withdrawn.totalCount ?? 0
  const successful = data?.successful.totalCount ?? 0
  const failed = data?.failed.totalCount ?? 0
  return {
    isLoading: loading,
    total: withdrawn + successful + failed,
    withdrawn,
    successful,
    failed,
  }
}
