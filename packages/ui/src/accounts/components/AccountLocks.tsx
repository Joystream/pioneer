import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { BalanceLock, LockType } from '@/accounts/types'
import { EnvelopeIcon, LabelIcon, LockIcon, VoteIcon } from '@/common/components/icons/locks'
import { ColumnGapBlock } from '@/common/components/page/PageContent'

const locksMap: Record<LockType, ReactElement> = {
  Voting: <VoteIcon />,
  'Council Candidate': <LabelIcon />,
  Councilor: <LockIcon />,
  Validation: <LockIcon />,
  Nomination: <LockIcon />,
  Proposals: <LockIcon />,
  'Storage Worker': <LabelIcon />,
  'Content Directory Worker': <LabelIcon />,
  'Forum Worker': <LabelIcon />,
  'Membership Worker': <LabelIcon />,
  Invitation: <EnvelopeIcon />,
  'Staking Candidate': <LockIcon />,
  Bounty: <LockIcon />,
}

export const lockIcon = (type: LockType) => locksMap[type]

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
        <AccountLockIconWrapper key={index} title={lock.type}>
          {lockIcon(lock.type)}
        </AccountLockIconWrapper>
      ))}
    </AccountLocksWrapper>
  )
}

export const AccountLocksWrapper = styled(ColumnGapBlock)`
  position: absolute;
  top: 20px;
  align-items: center;
`

const AccountLockIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
`
