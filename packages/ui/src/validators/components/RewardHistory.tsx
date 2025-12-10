import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ButtonPrimary } from '@/common/components/buttons'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { List, ListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useAllAccountsRewardHistory } from '@/validators/hooks/useRewardHistory'

import { RewardHistoryItem } from './dashboard/RewardHistoryItem'

export function RewardHistory() {
  const { allAccounts, hasAccounts, isLoading, wallet } = useMyAccounts()
  const { showModal } = useModal()

  const addresses = useMemo(() => allAccounts.map((acc) => acc.address), [allAccounts])
  const rewardHistory = useAllAccountsRewardHistory(addresses)

  if (!hasAccounts && !isLoading) {
    return (
      <EmptyPagePlaceholder
        title="Connect your wallet or create an account"
        copy="A Polkadot wallet is required to see a breakdown of all your connected wallet account balances."
        button={
          <ButtonPrimary size="large" onClick={() => showModal({ modal: 'OnBoardingModal' })}>
            {!wallet ? 'Connect Wallet' : 'Join Now'}
          </ButtonPrimary>
        }
      />
    )
  }

  if (!rewardHistory && isLoading) {
    return (
      <ContentWithTabs>
        <Loading />
      </ContentWithTabs>
    )
  }

  if (!rewardHistory || rewardHistory.length === 0) {
    return (
      <EmptyPagePlaceholder
        title="No Reward History"
        copy="No claimed staking rewards found for your accounts. Start validating to earn rewards."
        button={
          !hasAccounts ? (
            <ButtonPrimary size="large" onClick={() => showModal({ modal: 'OnBoardingModal' })}>
              {!wallet ? 'Connect Wallet' : 'Join Now'}
            </ButtonPrimary>
          ) : undefined
        }
      />
    )
  }

  return (
    <ContentWithTabs>
      <AccountsWrap>
        <ListHeaders>
          <ListHeader>REWARD AMOUNT</ListHeader>
          <ListHeader>ERA</ListHeader>
          <ListHeader>DATE</ListHeader>
        </ListHeaders>
        <List>
          {rewardHistory.map((reward, index) => (
            <ListItem key={`${reward.era}-${reward.validatorStash}-${index}`}>
              <RewardHistoryItem reward={reward} />
            </ListItem>
          ))}
        </List>
      </AccountsWrap>
    </ContentWithTabs>
  )
}

const AccountsWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'accountstablenav'
    'accountslist';
  grid-row-gap: 4px;
  width: 100%;

  ${List} {
    gap: 8px;
  }
  ${ListItem} {
    background: ${Colors.Black[50]};
  }
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 140px repeat(2, 110px) 45px;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
`

export const ListHeader = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-self: start;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;
  user-select: none;
  cursor: pointer;

  &:first-child {
    text-align: left;
    justify-self: start;
  }
`
