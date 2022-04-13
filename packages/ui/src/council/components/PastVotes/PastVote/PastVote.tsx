import React from 'react'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useIsVoteStakeLocked } from '@/accounts/hooks/useIsVoteStakeLocked'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { RecoverBalanceModalCall, VotingData } from '@/accounts/modals/RecoverBalance'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { BlockTime } from '@/common/components/BlockTime'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { TextInlineMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { Vote } from '@/council/types'
import { LatestElection } from '@/council/types/LatestElection'
import { MemberInfo } from '@/memberships/components'

import { PastVoteTableListItem, StakeRecoveringButton } from '../styles'

export interface PastVoteProps {
  vote: Vote
  latestElection?: LatestElection
  $colLayout: string
}

export const PastVote = ({ vote, latestElection, $colLayout }: PastVoteProps) => {
  const { allAccounts } = useMyAccounts()
  const { showModal } = useModal()
  const { isTransactionPending } = useTransactionStatus()
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

  const isVoteStakeLocked = useIsVoteStakeLocked(latestElection, vote.voteFor)
  // Reflects if the stake has been already released by the member.
  const isRecovered = !vote.stakeLocked
  const isDisabled = isVoteStakeLocked || isRecovered || isTransactionPending

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
