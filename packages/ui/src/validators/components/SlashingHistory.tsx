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
import { useSlashingHistory } from '@/validators/hooks/useSlashingHistory'

import { SlashHistoryItem } from './dashboard/SlashHistoryItem'

export function SlashingHistory() {
  const { allAccounts, hasAccounts, isLoading, wallet } = useMyAccounts()
  const { showModal } = useModal()

  const addresses = useMemo(() => allAccounts.map((acc) => acc.address), [allAccounts])
  const slashingHistory = useSlashingHistory(addresses)

  if (!hasAccounts && !isLoading) {
    return (
      <EmptyPagePlaceholder
        title="Connect your wallet or create an account"
        copy="A Polkadot wallet is required to see slashing history for your accounts."
        button={
          <ButtonPrimary size="large" onClick={() => showModal({ modal: 'OnBoardingModal' })}>
            {!wallet ? 'Connect Wallet' : 'Join Now'}
          </ButtonPrimary>
        }
      />
    )
  }

  if (!slashingHistory && isLoading) {
    return (
      <ContentWithTabs>
        <Loading />
      </ContentWithTabs>
    )
  }

  if (!slashingHistory || slashingHistory.length === 0) {
    return (
      <EmptyPagePlaceholder
        title="No Slashing Events"
        copy="Good news! No slashing events found for your accounts. Keep up the good work maintaining high uptime and proper validation."
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
          <ListHeader>TYPE</ListHeader>
          <ListHeader>ERA</ListHeader>
          <ListHeader>DATE</ListHeader>
        </ListHeaders>
        <List>
          {slashingHistory.map((slash, index) => (
            <ListItem key={`${slash.era}-${slash.validatorAddress}-${index}`}>
              <SlashHistoryItem slash={slash} />
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
  grid-template-columns: 165px repeat(2, 128px) 104px;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  gap: 16px;
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
