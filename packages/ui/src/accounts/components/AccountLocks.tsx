import React from 'react'
import styled from 'styled-components'

import { LockType, BalanceLock } from '@/accounts/types'
import { EnvelopeIcon } from '@/common/components/icons/EnvelopeIcon'
import { LabelIcon } from '@/common/components/icons/LabelIcon'
import { LockIcon } from '@/common/components/icons/locks/LockIcon'
import { VoteIcon } from '@/common/components/icons/VoteIcon'
import { ColumnGapBlock } from '@/common/components/page/PageContent'

export const lockIcon = (type: LockType) => {
  switch (type) {
    case 'Voting':
      return <VoteIcon />
    case 'Council Candidate':
      return <LockIcon />
    case 'Councilor':
      return <LockIcon />
    case 'Validation':
      return <LockIcon />
    case 'Nomination':
      return <LockIcon />
    case 'Proposals':
      return <LockIcon />
    case 'Storage Worker':
      return <LockIcon />
    case 'Content Directory Worker':
      return <LockIcon />
    case 'Forum Worker':
      return <LockIcon />
    case 'Membership Worker':
      return <LockIcon />
    case 'Invitation':
      return <EnvelopeIcon />
    case 'Staking Candidate':
      return <LabelIcon />
  }
}

export interface AccountLocksProps {
  locks?: BalanceLock[]
}

export const AccountLocks = ({ locks }: AccountLocksProps) => {
  if (!locks || !locks.length) {
    return null
  }

  return (
    <AccountLocksWrapper gap={4}>
      {locks.map((lock, index) => (
        <span key={index} title={lock.type}>
          {lockIcon(lock.type)}
        </span>
      ))}
    </AccountLocksWrapper>
  )
}

const AccountLocksWrapper = styled(ColumnGapBlock)`
  position: absolute;
  top: 20px;
`
