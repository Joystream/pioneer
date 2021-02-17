import { Account } from './index'

export interface Member {
  name: string
  rootAccount: Account
  controllerAccount: Account
  handle: string
  avatarURI?: string
  about?: string
}
