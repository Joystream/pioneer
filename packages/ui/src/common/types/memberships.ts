import { MemberFieldsFragment } from '../../membership/queries'

import { Account } from '.'

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
