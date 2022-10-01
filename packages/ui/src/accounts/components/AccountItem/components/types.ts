import React from 'react'

import { BalanceLock } from '@/accounts/types'
import { Address } from '@/common/types'

export interface LockDetailsProps {
  lock: BalanceLock
  address: Address
  isRecoverable?: boolean
}

export interface LockRecoveryTimeProps {
  time?: string | null
  unrecoverableLabel?: string
  tooltipLabel?: string | React.ReactElement
}
