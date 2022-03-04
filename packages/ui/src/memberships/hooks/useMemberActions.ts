import { useGetMemberActionDetailsQuery } from '@/memberships/queries'
import { Member } from '@/memberships/types'

export function useMemberActions(member: Member) {
  const { data } = useGetMemberActionDetailsQuery({
    variables: { workerId_in: member.roles.map(({ id }) => id) },
  })
  return {
    slashed: data?.stakeSlashedEventsConnection.totalCount,
    terminated:
      data && data.terminatedLeaderEventsConnection.totalCount + data.terminatedWorkerEventsConnection.totalCount,
    invited: data?.memberInvitedEventsConnection.totalCount,
  }
}
