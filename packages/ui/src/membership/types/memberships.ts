import { Account } from '../../accounts/types'
import { MemberFieldsFragment } from '../queries'

export interface Member {
  name: string
  rootAccount: Account
  controllerAccount: Account
  handle: string
  avatarUri?: string
  about?: string
  referrer?: BaseMember
  invitor?: BaseMember
}

export type BaseMember = Omit<MemberFieldsFragment, '__typename'>
