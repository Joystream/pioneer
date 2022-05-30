import { BalanceLock } from '@/accounts/types'
import { Address } from '@/common/types'

export interface LockDetailsProps {
  lock: BalanceLock
  address: Address
  isRecoverable?: boolean
}
