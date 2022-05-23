import React from 'react'

import { LockType } from '@/accounts/types'
import { TextMedium } from '@/common/components/typography'
import { Address } from '@/common/types'
import { Member } from '@/memberships/types'

import {
  BoundAccountLockDate,
  BountyLockDate,
  CouncilCandidateLockDate,
  CouncilorLockDate,
  InvitationLockDate,
  ProposalLockDate,
  VoteLockDate,
  WorkingGroupLockDate,
} from './LockDate'

interface LockDateWrapperProps {
  lockType: LockType
  address: Address
  memberId?: string
  boundMembership?: Member
}

export const LockDateWrapper = React.memo(({ lockType, address, memberId, boundMembership }: LockDateWrapperProps) => {
  switch (lockType) {
    case 'Bound Staking Account':
      return <BoundAccountLockDate address={address} boundMembership={boundMembership} />

    case 'Council Candidate':
      return <CouncilCandidateLockDate memberId={memberId} />

    case 'Councilor':
      return <CouncilorLockDate memberId={memberId} />

    case 'Voting':
      return <VoteLockDate address={address} />

    case 'Proposals':
      return <ProposalLockDate memberId={memberId} />

    case 'Bounties':
      return <BountyLockDate memberId={memberId} />

    case 'Invitation':
      return <InvitationLockDate memberId={memberId} />

    // TODO: handle it in more elegant way
    case 'Storage Worker':
    case 'Content Directory Worker':
    case 'Forum Worker':
    case 'Membership Worker':
    case 'Gateway Worker':
    case 'Builders Worker':
    case 'HR Worker':
    case 'Marketing Worker':
    case 'Distribution Worker':
      return <WorkingGroupLockDate memberId={memberId} />

    default:
      return <TextMedium value>Unknown</TextMedium>
  }
})
