import { Comparator } from '../../common/model/Comparator'
import { BaseMember } from '../types'

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
