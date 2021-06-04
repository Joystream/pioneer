import React from 'react'
import styled from 'styled-components'

import { LockType, BalanceLock } from '@/accounts/types'
import { EnvelopeIcon } from '@/common/components/icons/EnvelopeIcon'
import { LabelIcon } from '@/common/components/icons/LabelIcon'
import { VoteIcon } from '@/common/components/icons/VoteIcon'
import { ColumnGapBlock } from '@/common/components/page/PageContent'

export const lockIcon = (type: LockType) => {
  switch (type) {
    case 'Voting':
      return <VoteIcon />
    case 'Council Candidate':
      return <LabelIcon />
    case 'Councilor':
      return <LabelIcon />
    case 'Validation':
      return <LabelIcon />
    case 'Nomination':
      return <LabelIcon />
    case 'Proposals':
      return <LabelIcon />
    case 'Storage Worker':
      return <LabelIcon />
    case 'Content Directory Worker':
      return <LabelIcon />
    case 'Forum Worker':
      return <LabelIcon />
    case 'Membership Worker':
      return <LabelIcon />
    case 'Invitation':
      return <EnvelopeIcon />
    case 'Staking Candidate':
      return <LabelIcon />
  }
}

export interface AccountLocksProps {
  locks: BalanceLock[] | undefined
}

export const AccountLocks = ({ locks }: AccountLocksProps) => {
  if (!locks || !locks.length) {
    return null
  }

  return (
    <AccountLocksWrapper gap={4}>
      {locks.map((lock, index) => (
        <span key={index}>{lockIcon(lock.type)}</span>
      ))}
    </AccountLocksWrapper>
  )
}

const AccountLocksWrapper = styled(ColumnGapBlock)`
  position: absolute;
  top: 20px;
`
