import { Comparator } from '../../common/model/Comparator'
import { Member } from '../types'

export type SortKey = keyof Member

export function sortMemberships(members: Member[], key: SortKey, isDescending = false) {
  if (key === 'handle') {
    return [...members].sort(Comparator<Member>(isDescending, key).string)
  }
  if (key === 'inviteCount') {
    return [...members].sort(Comparator<Member>(isDescending, key).number)
  }
  return members
}

export function setOrder(
  key: SortKey,
  sortBy: SortKey,
  setSortBy: (k: SortKey) => void,
  reversed: boolean,
  setDescending: (d: boolean) => void
) {
  if (key === sortBy) {
    setDescending(!reversed)
  } else {
    setDescending(key !== 'handle')
    setSortBy(key)
  }
}
