import { MemberFieldsFragment } from '../../api/queries'
import { Account } from './index'

export interface Member {
  name: string
  rootAccount: Account
  controllerAccount: Account
  handle: string
  avatarURI?: string
  about?: string
}

export type BaseMember = Omit<MemberFieldsFragment, '__typename'>
