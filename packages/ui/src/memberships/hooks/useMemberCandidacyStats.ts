import { useGetCandidateStatsQuery } from '@/council/queries'

export const useMemberCandidacyStats = (memberId?: string) => {
  const { loading, data } = useGetCandidateStatsQuery({ variables: { memberId } })

  const withdrawn = data?.candidacyWithdrawEventsConnection.totalCount ?? 0
  const successful = data?.councilMembersConnection.totalCount ?? 0
  const total = data?.candidatesConnection.totalCount ?? 0
  const failed = (total && successful && withdrawn && total - successful - withdrawn) ?? 0
  return {
    isLoading: loading,
    total,
    withdrawn,
    successful,
    failed,
  }
}
