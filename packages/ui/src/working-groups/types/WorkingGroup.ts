import BN from 'bn.js'

import { BaseMember } from '../../memberships/types'

export interface WorkingGroup {
  name: string
  image?: string
  about?: string
  leader?: Pick<BaseMember, 'id' | 'avatarUri'>
}

export interface WorkingGroupOpening {
  id: string
  duration: [number, string]
  title: string
  type: 'LEADER' | 'REGULAR'
  reward: {
    value: BN
    interval: number
  }
  applicants: {
    current: number
    total: number
  }
  hiring: {
    current: number
    total: number
  }
}
