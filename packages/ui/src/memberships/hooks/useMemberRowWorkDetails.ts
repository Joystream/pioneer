import { useGetMemberRowDetailsQuery } from '@/memberships/queries'
import { MemberWithReferrer } from '@/memberships/types'

export function useMemberRowWorkDetails(member: MemberWithReferrer) {
  const { data } = useGetMemberRowDetailsQuery({
    variables: { workerId_in: member.roles.map(({ id }) => id) },
  })
  return {
    slashed: data?.stakeSlashedEventsConnection.totalCount,
    terminated:
      data && data.terminatedLeaderEventsConnection.totalCount + data.terminatedWorkerEventsConnection.totalCount,
  }
}
