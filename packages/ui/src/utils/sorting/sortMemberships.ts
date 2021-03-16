import { BaseMember } from '../../common/types'
import { Comparator } from './Comparator'

export type SortKey = keyof BaseMember

export function sortMemberships(members: BaseMember[], key: SortKey, isDescending = false) {
  if (key === 'handle') {
    return members.sort(Comparator<BaseMember>(isDescending, key).string)
  }
  if (key === 'inviteCount') {
    return members.sort(Comparator<BaseMember>(isDescending, key).number)
  }
  return members
}
