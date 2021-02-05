import React from 'react'
import styled from 'styled-components'
import { TokenValue } from '../../components/typography'
import { TransferButtonStyled } from '../../components/TransferButton'
import { Colors } from '../../constants'
import { useTotalBalances } from '../../hooks/useTotalBalances'

export function ProfileComponent() {
  const { total } = useTotalBalances()

  return (
    <Profile>
      <MemberBalance>
        <BalanceTitle>Total Balance</BalanceTitle>
        <TotalBalance>
          <TokenValue value={total} />
        </TotalBalance>
        <TransferButtonStyled />
      </MemberBalance>
    </Profile>
  )
}

const Profile = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px 64px 56px;
  grid-template-areas:
    'memberships'
    'memberaccount'
    'memberbalance';
  grid-row-gap: 16px;
  grid-area: barmember;
  width: 100%;
  padding: 0 8px;
`

const MemberBalance = styled.div`
  display: grid;
  grid-area: memberbalance;
  grid-template-columns: 1fr 54px;
  grid-template-rows: 16px 24px;
  grid-template-areas:
    'balancetitle balancetransfer'
    'balancevalue balancetransfer';
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  padding-left: 8px;
`

const BalanceTitle = styled.span`
  grid-area: balancetitle;
  font-size: 10px;
  line-height: 16px;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  font-weight: 700;
`

const TotalBalance = styled.span`
  display: inline-flex;
  align-items: baseline;
  position: relative;
  grid-area: balancevalue;
  width: fit-content;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.White};
  font-weight: 700;
`
