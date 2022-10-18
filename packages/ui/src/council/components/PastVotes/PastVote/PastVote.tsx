import React from 'react'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useIsVoteLockRecoverable } from '@/accounts/hooks/useGroupLocks'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { RecoverBalanceModalCall, VotingData } from '@/accounts/modals/RecoverBalance'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { BlockTime } from '@/common/components/BlockTime'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { TextInlineMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { Vote } from '@/council/types'
import { MemberInfo } from '@/memberships/components'

import { PastVoteTableListItem, StakeRecoveringButton } from '../styles'

export interface PastVoteProps {
  vote: Vote
  $colLayout: string
}

export const PastVote = ({ vote, $colLayout }: PastVoteProps) => {
  const { allAccounts } = useMyAccounts()
  const { showModal } = useModal()
  const { isTransactionPending } = useTransactionStatus()
  const balance = useBalance(vote.castBy)

  const onClick = () => {
    showModal<RecoverBalanceModalCall>({
      modal: 'RecoverBalance',
      data: {
        lock: {
          amount: vote.stake,
          type: 'Voting',
        },
        address: vote.castBy,
      } as VotingData,
    })
  }

  // Reflects if the vote was cast in latest election
  const isRecovered = !vote.stakeLocked
  const hasVoteLock = (!isRecovered && balance?.locks.some(({ type }) => type === 'Voting')) ?? false
  const isVoteStakeRecoverable = useIsVoteLockRecoverable(hasVoteLock, vote.castBy)

  // Reflects if the stake has been already released by the member.
  const isDisabled = !isVoteStakeRecoverable || isRecovered || isTransactionPending

  return (
    <PastVoteTableListItem $isPast $colLayout={$colLayout}>
      <TextInlineMedium>#{vote.cycleId}</TextInlineMedium>
      {vote.createdAtBlock ? <BlockTime block={vote.createdAtBlock} lessInfo layout="reverse-start" /> : <></>}
      {vote.voteFor ? <MemberInfo member={vote.voteFor} /> : <TextInlineMedium>not revealed</TextInlineMedium>}
      <TokenValue value={vote.stake} />
      <AccountInfo account={accountOrNamed(allAccounts, vote.castBy, 'Staking account')} />
      <TextInlineMedium>{!vote.voteFor ? 'Sealed' : 'Unsealed'}</TextInlineMedium>
      <TransactionButtonWrapper>
        <StakeRecoveringButton size="small" disabled={isDisabled} onClick={onClick}>
          {isRecovered ? 'Stake recovered' : 'Recover stake'}
        </StakeRecoveringButton>
      </TransactionButtonWrapper>
    </PastVoteTableListItem>
  )
}
