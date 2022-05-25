import { BalanceLock } from '@/accounts/types'
import { Address } from '@/common/types'

export interface LockItemProps {
  lock: BalanceLock
  address: Address
  isRecoverable?: boolean
}
