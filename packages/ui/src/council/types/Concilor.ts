import { Member } from '@/memberships/types'

export interface Councilor {
  id: string
  member: Member
  numberOfTerms: number
  unpaidReward: number
  stake: number
}
