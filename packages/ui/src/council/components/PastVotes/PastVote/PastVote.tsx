import React from 'react'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { BlockTime } from '@/common/components/BlockTime'
import { TextInlineMedium, TokenValue } from '@/common/components/typography'
import { Vote } from '@/council/types'
import { MemberInfo } from '@/memberships/components'

import { PastVoteTableListItem, StakeRecoveringButton } from '../styles'

export interface PastVoteProps {
  vote: Vote
  $colLayout: string
}

export const PastVote = ({ vote, $colLayout }: PastVoteProps) => {
  const { allAccounts } = useMyAccounts()
  return (
    <PastVoteTableListItem $isPast $colLayout={$colLayout}>
      <TextInlineMedium>#{vote.cycleId}</TextInlineMedium>
      <BlockTime
        block={{ number: -1, network: 'BABYLON', timestamp: '2000-01-01T00:00:00.893Z' }}
        lessInfo
        layout="reverse-start"
      />
      {vote.voteFor ? <MemberInfo member={vote.voteFor} /> : <TextInlineMedium>not revealed</TextInlineMedium>}
      <TokenValue value={vote.stake} />
      <AccountInfo account={accountOrNamed(allAccounts, vote.castBy, 'Staking account')} />
      <TextInlineMedium>{!vote.voteFor ? 'Sealed' : 'Unsealed'}</TextInlineMedium>
      <StakeRecoveringButton size="small" disabled={!vote.stakeLocked}>
        {vote.stakeLocked ? 'Recover stake' : 'Stake recovered'}
      </StakeRecoveringButton>
    </PastVoteTableListItem>
  )
}
