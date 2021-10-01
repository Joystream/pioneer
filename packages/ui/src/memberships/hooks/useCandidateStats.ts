import { useGetCandidateStatsQuery } from '@/council/queries'

export const useCandidateStats = (memberId: string) => {
  const { data } = useGetCandidateStatsQuery({ variables: { memberId } })
  return {
    withdrawn: data?.candidacyWithdrawEventsConnection.totalCount,
    successful: data?.councilMembersConnection.totalCount,
    failed: 0,
  }
}
