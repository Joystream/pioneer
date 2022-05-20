import React from 'react'

import { LockType } from '@/accounts/types'
import { TextMedium } from '@/common/components/typography'
import { Address } from '@/common/types'
import { Member } from '@/memberships/types'

import { BoundAccountLockData, CouncilCandidateLockDate } from './LockDate'

interface LockDateProps {
  lockType: LockType
  address: Address
  memberId?: string
  boundMembership?: Member
}

export const LockDateWrapper = ({ lockType, address, memberId, boundMembership }: LockDateProps) => {
  switch (lockType) {
    case 'Bound Staking Account':
      return <BoundAccountLockData address={address} boundMembership={boundMembership} />

    default:
      return <TextMedium value>Unknown</TextMedium>
  }
}
