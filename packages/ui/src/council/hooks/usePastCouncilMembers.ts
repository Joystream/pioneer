import { useGetPastCouncilMembersQuery } from '@/council/queries'
import { asPastCouncilMember } from '@/council/types/PastCouncilMember'

export const usePastCouncilMembers = (councilId: string) => {
  const { loading, data } = useGetPastCouncilMembersQuery({ variables: { councilId } })

  return { isLoading: loading, councilMembers: data && data.councilMembers.map(asPastCouncilMember) }
}
