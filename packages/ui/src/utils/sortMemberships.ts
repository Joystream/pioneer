import { BaseMember } from '../common/types'
import BN from 'bn.js'

export type SortKey = keyof BaseMember

const applyOrder = (order: number, isDescending: boolean) => order * (isDescending ? -1 : 1)

const Comparator = {
  string: (isDescending: boolean, key: SortKey) => (memberA: BaseMember, memberB: BaseMember) => {
    const a = memberA[key] || ''
    const b = memberB[key] || ''
    return applyOrder(a.localeCompare(b), isDescending)
  },
  bigNumber: (isDescending: boolean, key: SortKey) => (memberA: BaseMember, memberB: BaseMember) => {
    const a = memberA[key] || new BN(0)
    const b = memberB[key] || new BN(0)
    return applyOrder(a.cmp(b), isDescending)
  },
}

export function sortMemberships(members: BaseMember[], key: SortKey, isDescending = false) {
  if (['handle'].includes(key)) {
    return members.sort(Comparator.string(isDescending, key))
  }
  if (['inviteCount'].includes(key)) {
    return members.sort(Comparator.bigNumber(isDescending, key))
  }
  return members
}
