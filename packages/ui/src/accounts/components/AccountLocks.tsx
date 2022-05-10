import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { BalanceLock, LockType } from '@/accounts/types'
import { QuestionIcon } from '@/common/components/icons'
import {
  EnvelopeIcon,
  LabelIcon,
  LockIcon,
  VoteIcon,
  StorageWorkerIcon,
  ProposalIcon,
  OperationsWorkerIcon,
  CouncilCandidateIcon,
  ForumWorkerIcon,
  BountiesIcon,
  ValidationIcon,
  ContentDirectoryWorkerIcon,
  StakingIcon,
  CouncilorIcon,
} from '@/common/components/icons/locks'
import { ColumnGapBlock } from '@/common/components/page/PageContent'

const locksMap: Record<LockType, ReactElement> = {
  Staking: <LockIcon />,
  Vesting: <LockIcon />, // TODO this might need a different icon
  Voting: <VoteIcon />,
  'Council Candidate': <CouncilCandidateIcon />,
  Councilor: <CouncilorIcon />,
  Validation: <ValidationIcon />,
  Nomination: <LockIcon />,
  Proposals: <ProposalIcon />,
  'Storage Worker': <StorageWorkerIcon />,
  'Content Directory Worker': <ContentDirectoryWorkerIcon />,
  'Forum Worker': <ForumWorkerIcon />,
  'Membership Worker': <LabelIcon />,
  Invitation: <EnvelopeIcon />,
  'Bound Staking Account': <StakingIcon />,
  Bounties: <BountiesIcon />,
  'Gateway Worker': <OperationsWorkerIcon />,
  'Builders Worker': <OperationsWorkerIcon />,
  'HR Worker': <OperationsWorkerIcon />,
  'Marketing Worker': <OperationsWorkerIcon />,
  'Distribution Worker': <LockIcon />, // TODO this might need a different icon
}

export const lockIcon = (type: LockType) => locksMap[type] ?? <QuestionIcon />

export interface AccountLocksProps {
  locks?: BalanceLock[]
}

export const AccountLocks = ({ locks }: AccountLocksProps) => {
  if (!locks?.length) {
    return null
  }

  return (
    <AccountLocksWrapper gap={4}>
      {locks.map((lock, index) => (
        <AccountLockIconWrapper key={index} title={lock.type ?? 'Unknown lock'}>
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
