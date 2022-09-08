import { Account } from '@/accounts/types'

export interface UpdateMemberForm {
  id: string
  name?: string
  handle?: string
  avatarUri?: File | null | string
  about?: string
  rootAccount?: Account
  controllerAccount?: Account
  externalResources: Record<string, string>
}
