import { BaseMember } from '../../memberships/types'

export interface WorkingGroup {
  name: string
  image?: string
  about?: string
  leader?: Pick<BaseMember, 'id' | 'avatarUri'>
}
