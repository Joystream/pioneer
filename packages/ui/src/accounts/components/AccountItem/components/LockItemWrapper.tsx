import React from 'react'

import { BalanceLock } from '@/accounts/types'
import { TextMedium } from '@/common/components/typography'
import { Address } from '@/common/types'

import { CouncilorLockItem } from './lockItems/CouncilorLockItem'

interface LockItemWrapperProps {
  lock: BalanceLock
  address: Address
  isRecoverable?: boolean
}

export const LockItemWrapper = React.memo((props: LockItemWrapperProps) => {
  const lockType = props.lock.type
  switch (lockType) {
    // case 'Bound Staking Account':
    //   return <BoundAccountLockItem address={address} boundMembership={boundMembership} />

    // case 'Council CandiItem':
    //   return <CouncilCandidateLockItem memberId={memberId} />

    case 'Councilor':
      return <CouncilorLockItem {...props} />

    // case 'Voting':
    //   return <VoteLockItem address={address} />

    // case 'Proposals':
    //   return <ProposalLockItem memberId={memberId} />

    // case 'Bounties':
    //   return <BountyLockItem memberId={memberId} />

    // case 'Invitation':
    //   return <InvitationLockItem memberId={memberId} />

    // // TODO: handle it in more elegant way
    // case 'Storage Worker':
    // case 'Content Directory Worker':
    // case 'Forum Worker':
    // case 'Membership Worker':
    // case 'Gateway Worker':
    // case 'Builders Worker':
    // case 'HR Worker':
    // case 'Marketing Worker':
    // case 'Distribution Worker':
    //   return <WorkingGroupLockItem memberId={memberId} />

    default:
      return <TextMedium value>Unknown</TextMedium>
  }
})
