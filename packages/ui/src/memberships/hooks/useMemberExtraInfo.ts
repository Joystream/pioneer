import { useGetMemberExtraInfoQuery } from '@/memberships/queries'
import { Member } from '@/memberships/types'

export function useMemberExtraInfo(member: Member) {
  const { data } = useGetMemberExtraInfoQuery({
    variables: { membershipId_eq: member.id, workerId_in: member.roles.map(({ id }) => id) },
  })

  return {
    applied: data?.workingGroupApplicationsConnection.totalCount,
    slashed: data?.stakeSlashedEventsConnection.totalCount,
    terminated:
      data && data.terminatedLeaderEventsConnection.totalCount + data.terminatedWorkerEventsConnection.totalCount,
    blogPosts: data?.forumPostsConnection.totalCount,
    councilMember: data?.councilMembersConnection.totalCount,
    initiatingLeaving: data?.workerStartedLeavingEventsConnection.totalCount,
  }
}
