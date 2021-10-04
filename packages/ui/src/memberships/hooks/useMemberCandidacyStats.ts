import { useGetCandidateStatsQuery } from '@/council/queries'

export const useMemberCandidacyStats = (memberId: string) => {
  const { data } = useGetCandidateStatsQuery({ variables: { memberId } })
  const withdrawn = data?.candidacyWithdrawEventsConnection.totalCount
  const successful = data?.councilMembersConnection.totalCount
  const total = data?.candidatesConnection.totalCount
  const failed = total && successful && withdrawn && total - successful - withdrawn
  return {
    total,
    withdrawn,
    successful,
    failed,
  }
}
