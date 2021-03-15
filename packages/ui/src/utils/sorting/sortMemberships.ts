import { BaseMember } from '../../common/types'
import { Comparator } from './Comparator'

export type SortKey = keyof BaseMember

export function sortMemberships(members: BaseMember[], key: SortKey, isDescending = false) {
  if (['handle'].includes(key)) {
    return members.sort(Comparator<BaseMember>(isDescending, key).string)
  }
  if (['inviteCount'].includes(key)) {
    return members.sort(Comparator<BaseMember>(isDescending, key).bigNumber)
  }
  return members
}
