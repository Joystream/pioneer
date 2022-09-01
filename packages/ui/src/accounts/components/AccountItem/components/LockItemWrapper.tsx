import React from 'react'

import { WorkerLocks, WorkerLockType } from '@/accounts/types'

import { LockItem } from './LockItem'
import {
  BoundAccountLockItem,
  BountyLockItem,
  CouncilCandidateLockItem,
  CouncilorLockItem,
  InvitationLockItem,
  ProposalLockItem,
  VoteLockItem,
  WorkingGroupLockItem,
} from './lockItems'
import { LockDetailsProps } from './types'

export const LockItemWrapper = React.memo((props: LockDetailsProps) => {
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
    case 'Vesting':
      return null
    default:
      return WorkerLocks.includes(lockType as WorkerLockType) ? (
        <WorkingGroupLockItem {...props} />
      ) : (
        <LockItem {...props} />
      )
  }
})
