import { Account } from '../../../accounts/types'

export interface UpdateMemberForm {
  id: string
  name?: string
  handle?: string
  avatarUri?: string
  about?: string
  rootAccount?: Account
  controllerAccount?: Account
}
