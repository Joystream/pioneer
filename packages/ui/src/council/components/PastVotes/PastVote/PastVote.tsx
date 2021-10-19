import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { ListItem } from '@/common/components/List'
import { TextInlineMedium, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { Vote } from '@/council/types'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface PastVoteProps {
  vote: Vote
}

const unrevealed: Member = {
  id: '-1',
  handle: 'Not revealed',
  rootAccount: '',
  controllerAccount: '',
  roles: [],
  inviteCount: 0,
  isVerified: false,
  isFoundingMember: false,
  isCouncilMember: false,
  createdAt: '',
}

export const PastVote = ({ vote }: PastVoteProps) => {
  const { allAccounts } = useMyAccounts()
  return (
    <PastVoteWrapper>
      <TextInlineMedium>#{vote.cycleId}</TextInlineMedium>
      <BlockTime block={{ number: -1, network: 'BABYLON', timestamp: '2000-01-01T00:00:00.893Z' }} />
      <MemberInfo member={vote.voteFor ?? unrevealed} skipModal={!vote.voteFor} />
      <TokenValue value={vote.stake} />
      <AccountInfo account={accountOrNamed(allAccounts, vote.castBy, 'Staking account')} />
      <TextInlineMedium>{vote.stakeLocked ? 'Sealed' : 'Recovered'}</TextInlineMedium>
      <ButtonPrimary size="medium" disabled={!vote.stakeLocked}>
        {vote.stakeLocked ? 'Recover stake' : 'Stake recovered'}
      </ButtonPrimary>
    </PastVoteWrapper>
  )
}

const PastVoteWrapper = styled(ListItem)`
  position: relative;
  grid-template-columns: 48px 1fr 0.7fr 0.7fr 1fr 0.5fr 0.7fr;
  align-items: center;
  grid-column-gap: 8px;
  height: 116px;
  padding: 24px 48px 24px 8px;

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
  }

  ${ButtonsGroup} {
    margin-left: auto;
  }
`
