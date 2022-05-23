import React from 'react'

import { LockType } from '@/accounts/types'
import { TextMedium } from '@/common/components/typography'
import { Address } from '@/common/types'
import { Member } from '@/memberships/types'

import {
  BoundAccountLockData,
  BountyLockDate,
  CouncilCandidateLockDate,
  CouncilorLockDate,
  InvitationLockDate,
  ProposalLockDate,
  VoteLockDate,
  WorkingGroupLockDate,
} from './LockDate'

interface LockDateProps {
  lockType: LockType
  address: Address
  memberId?: string
  boundMembership?: Member
}

export const LockDateWrapper = React.memo(({ lockType, address, memberId, boundMembership }: LockDateProps) => {
  switch (lockType) {
    case 'Bound Staking Account':
      return <BoundAccountLockData address={address} boundMembership={boundMembership} />

    case 'Council Candidate':
      return <CouncilCandidateLockDate address={address} memberId={memberId} />

    case 'Councilor':
      return <CouncilorLockDate address={address} memberId={memberId} />

    case 'Voting':
      return <VoteLockDate address={address} memberId={memberId} />

    case 'Proposals':
      return <ProposalLockDate address={address} memberId={memberId} />

    case 'Bounties':
      return <BountyLockDate address={address} memberId={memberId} />

    case 'Invitation':
      return <InvitationLockDate address={address} memberId={memberId} />

    case 'Storage Worker':
    case 'Content Directory Worker':
    case 'Forum Worker':
    case 'Membership Worker':
    case 'Gateway Worker':
    case 'Builders Worker':
    case 'HR Worker':
    case 'Marketing Worker':
    case 'Distribution Worker':
      return <WorkingGroupLockDate address={address} memberId={memberId} />

    default:
      return <TextMedium value>Unknown</TextMedium>
  }
})
