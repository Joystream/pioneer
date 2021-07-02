import React from 'react'
import styled from 'styled-components'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { Account, BalanceLock } from '@/accounts/types'
import { ButtonGhost } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { Arrow } from '@/common/components/icons'
import { BoxIcon } from '@/common/components/icons/BoxIcon'
import { VoteIcon } from '@/common/components/icons/VoteIcon'
import { Label, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'

interface DetailsItemDataProps {
  lock: BalanceLock
}

export const LockItem = ({ lock }: DetailsItemDataProps) => {
  const [isDropped] = useToggle()

  return (
    <DetailsItemVoteWrapper>
      <AccountDetailsWrap>
        <DetailsInfo>
          {lockIcon(lock.type)}
          <DetailsName>{lock.type}</DetailsName>
        </DetailsInfo>
        <TokenValue value={0} />
        <TokenValue value={lock.amount} />
        <TokenValue value={0} />
        <TokenValue value={0} />
        {/*<DropDownButton onClick={setDropped} isDropped={isDropped} size="medium" />*/}
      </AccountDetailsWrap>
      <DetailsDropDownToggle isDropped={isDropped}>
        <DetailsDropDownColumn>
          <DetailBox>
            <DetailBoxTitle>Lock date:</DetailBoxTitle>
            <TextMedium dark>01/07/2020, 10:00 am CET</TextMedium>
            <DetailBlockNumber>
              <BoxIcon />
              <DetailBlockNumberText lighter>389,829 block</DetailBlockNumberText>
            </DetailBlockNumber>
          </DetailBox>
          <DetailBox>
            <DetailBoxTitle>Role:</DetailBoxTitle>
            <TextMedium dark>Storage Provider</TextMedium>
          </DetailBox>
        </DetailsDropDownColumn>
        <DetailsDropDownColumn>
          <DetailsButton size="small">
            Application preview
            <ButtonArrow direction="right" />
          </DetailsButton>
          <DetailsButton size="small">
            Opening preview
            <ButtonArrow direction="right" />
          </DetailsButton>
        </DetailsDropDownColumn>
      </DetailsDropDownToggle>
    </DetailsItemVoteWrapper>
  )
}

interface DetailsItemVoteDataProps {
  account: Account
}

export const DetailsItemVote = ({ account }: DetailsItemVoteDataProps) => {
  const address = account.address
  const balance = useBalance(address)

  const [isDropped, setDropped] = useToggle()

  return (
    <DetailsItemVoteWrapper>
      <AccountDetailsWrap>
        <DetailsInfo>
          <VoteIcon />
          <DetailsName>Staking for voting</DetailsName>
        </DetailsInfo>
        <TokenValue value={balance?.total} />
        <TokenValue value={balance?.locked} />
        <TokenValue value={balance?.recoverable} />
        <TokenValue value={balance?.transferable} />
        <DropDownButton onClick={setDropped} isDropped={isDropped} size="medium" />
      </AccountDetailsWrap>
      <DetailsDropDownToggle isDropped={isDropped}>
        <DetailsDropDownColumn>
          <DetailBox>
            <DetailBoxTitle>Lock date:</DetailBoxTitle>
            <TextMedium dark>01/07/2020, 10:00 am CET</TextMedium>
            <DetailBlockNumber>
              <BoxIcon />
              <DetailBlockNumberText lighter>389,829 block</DetailBlockNumberText>
            </DetailBlockNumber>
          </DetailBox>
          <DetailBox>
            <DetailBoxTitle>Role:</DetailBoxTitle>
            <TextMedium dark>Storage Provider</TextMedium>
          </DetailBox>
        </DetailsDropDownColumn>
        <DetailsDropDownColumn>
          <DetailsButton size={'small'}>
            Application preview
            <ButtonArrow direction="right" />
          </DetailsButton>
          <DetailsButton size={'small'}>
            Opening preview
            <ButtonArrow direction="right" />
          </DetailsButton>
        </DetailsDropDownColumn>
      </DetailsDropDownToggle>
    </DetailsItemVoteWrapper>
  )
}

const DetailsItemVoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const AccountDetailsWrap = styled.div`
  display: grid;
  grid-template-columns: 260px repeat(4, 132px) 86px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  padding: 4px 16px;
  height: 46px;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`

const DetailsDropDownToggle = styled(DropDownToggle)`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px 16px 16px;
  background-color: ${Colors.White};
`

const DetailsDropDownColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;

  &:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`

const DetailsInfo = styled.div`
  display: flex;
  width: 100%;
  column-gap: 16px;
`

const DetailsName = styled.h6`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: ${Colors.Black[900]};
`

const DetailBox = styled.div``

const DetailBoxTitle = styled(Label)`
  margin-bottom: 8px;
`

const ButtonArrow = styled(Arrow)`
  fill: ${Colors.Black[400]};
`

const DetailsButton = styled(ButtonGhost)`
  margin-left: 10px;
`

const DetailBlockNumber = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`

const DetailBlockNumberText = styled(TextSmall)`
  margin-left: 4px;
`
