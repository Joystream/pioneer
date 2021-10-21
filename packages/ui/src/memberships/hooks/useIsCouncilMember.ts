import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

import { Member } from '../types'

export const useIsCouncilMember = (member?: Member) => {
  const { api, connectionState } = useApi()
  const council = useObservable(api?.query.council.councilMembers(), [connectionState])
  const councilMembersIds = council?.map(({ membership_id }) => membership_id.toNumber()) ?? []
  const isCouncil = member && councilMembersIds.includes(parseInt(member.id))
  return isCouncil
}
