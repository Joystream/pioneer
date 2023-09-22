import React from 'react'
import styled from 'styled-components'

import { QuestionIcon } from '@/common/components/icons'
import { Tooltip, DefaultTooltip } from '@/common/components/Tooltip'

import { TransferButtonStyled } from '../../accounts/components/TransferButton'
import { useMyTotalBalances } from '../../accounts/hooks/useMyTotalBalances'
import { TextSmall, TokenValue } from '../../common/components/typography'
import { Colors } from '../../common/constants'

import { Memberships } from '.'
import { CurrentMember } from './CurrentMember'

export function ProfileComponent() {
  const { total } = useMyTotalBalances()

  return (
    <Profile>
      <CurrentMember />
      <MemberBalance>
        <BalanceTitle>Total Balance</BalanceTitle>
        <TotalBalance>
          <TokenDetail>
            <TotalTokenValue value={total} />
            <StyledTooltip
              tooltipLinkText="Learn how to earn JOY’s"
              tooltipLinkURL="https://www.joystream.org/token#earn"
              placement="top-start"
            >
              <StyledDefaultTooltip>
                <QuestionIcon />
              </StyledDefaultTooltip>
            </StyledTooltip>
          </TokenDetail>
          <TextSmall>
            <BuyTokenLink href="https://www.joystream.org/token/#exchanges" target="_blank">
              Buy Joy tokens
            </BuyTokenLink>
          </TextSmall>
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

  ${Memberships} {
    margin-left: 8px;
  }
`

const MemberBalance = styled.div`
  display: grid;
  grid-area: memberbalance;
  grid-template-columns: 1fr 32px;
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

export const BalanceTitle = styled.span`
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
  flex-direction: column;
`

const TotalTokenValue = styled(TokenValue)`
  color: ${Colors.White};
`
const BuyTokenLink = styled.a`
  color: ${Colors.White};
  font-weight: 400;
  text-decoration: underline;
`
const TokenDetail = styled.div`
  display: flex;
  column-gap: 8px;
`
const StyledDefaultTooltip = styled(DefaultTooltip)`
  margin-top: 4px;
`
const StyledTooltip = styled(Tooltip)`
  background-color: ${Colors.Black[75]};
  border-color: ${Colors.Black[300]};
  a {
    color: ${Colors.Blue[500]};
    font-weight: 700;
  }
  :after {
    background-color: ${Colors.Black[75]};
    border-color: ${Colors.Black[300]};
  }
`
