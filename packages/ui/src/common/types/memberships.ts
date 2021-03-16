import { MemberFieldsFragment } from '../../api/queries'
import { Account } from './index'

export interface Member {
  name: string
  rootAccount: Account
  controllerAccount: Account
  handle: string
  avatarURI?: string
  about?: string
  referrer?: BaseMember
}

export type BaseMember = Omit<MemberFieldsFragment, '__typename'>
