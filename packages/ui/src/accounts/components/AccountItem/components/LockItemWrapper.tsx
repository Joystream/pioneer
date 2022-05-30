import React from 'react'

import { BalanceLock, WorkerLocks, WorkerLockType } from '@/accounts/types'
import { Address } from '@/common/types'

import {
  BoundAccountLockItem,
  BountyLockItem,
  CouncilCandidateLockItem,
  CouncilorLockItem,
  DefaultLockItem,
  InvitationLockItem,
  ProposalLockItem,
  VoteLockItem,
  WorkingGroupLockItem,
} from './lockItems'

interface LockItemWrapperProps {
  lock: BalanceLock
  address: Address
  isRecoverable?: boolean
}

export const LockItemWrapper = React.memo((props: LockItemWrapperProps) => {
  const lockType = props.lock.type
  switch (lockType) {
    case 'Bound Staking Account':
      return <BoundAccountLockItem {...props} />

    case 'Council Candidate':
      return <CouncilCandidateLockItem {...props} />

    case 'Councilor':
      return <CouncilorLockItem {...props} />

    case 'Voting':
      return <VoteLockItem {...props} />

    case 'Proposals':
      return <ProposalLockItem {...props} />

    case 'Bounties':
      return <BountyLockItem {...props} />

    case 'Invitation':
      return <InvitationLockItem {...props} />

    default:
      return WorkerLocks.includes(lockType as WorkerLockType) ? (
        <WorkingGroupLockItem {...props} />
      ) : (
        <DefaultLockItem {...props} />
      )
  }
})
