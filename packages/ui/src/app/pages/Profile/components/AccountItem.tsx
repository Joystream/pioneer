import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '../../../../accounts/components/AccountInfo'
import { TransferButton } from '../../../../accounts/components/TransferButton'
import { useBalance } from '../../../../accounts/hooks/useBalance'
import { Account } from '../../../../accounts/types'
import { DropDownButton, DropDownToggle } from '../../../../common/components/buttons/DropDownToggle'
import { TextSmall, TextMedium, TokenValue } from '../../../../common/components/typography'
import { Sizes, Colors} from '../../../../common/constants'
import { useToggle } from '../../../../common/hooks/useToggle'
import { Label } from '../../../../common/components/typography/Label'
import { EnvelopeIcon } from '../../../../common/components/icons/EnvelopeIcon'
import { LabelIcon } from '../../../../common/components/icons/LabelIcon'
import { BoxIcon} from '../../../../common/components/icons/BoxIcon'
import { VoteIcon } from '../../../../common/components/icons/VoteIcon'
import { ButtonGhost } from '../../../../common/components/buttons'
import { Arrow } from '../../../../common/components/icons'

interface DetailsItemDataProps {
  account: Account
}

export const DetailsItem = ({ account }: DetailsItemDataProps) => {
  const address = account.address
  const balance = useBalance(address)

  const [isDropped, setDropped] = useToggle()

  return (
    <>
      <AccountDetailsWrap>
        <DetailsInfo>
          <LabelIcon/>
          <DetailsName>Staking for a role</DetailsName>
        </DetailsInfo>
        <TokenValue value={balance?.total}/>
        <TokenValue value={balance?.locked}/>
        <TokenValue value={balance?.recoverable}/>
        <TokenValue value={balance?.transferable}/>
        <DropDownButton onClick={setDropped} isDropped={isDropped} size="medium"/>
      </AccountDetailsWrap>
      <DetailsDropDownToggle isDropped={isDropped}>
        <DetailsDropDownColumn>
          <DetailBox>
            <DetailBoxTitle>Lock date:</DetailBoxTitle>
            <TextMedium dark>01/07/2020, 10:00 am CET</TextMedium>
            <DetailBlockNumber>
              <BoxIcon/>
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
            <ButtonArrow direction="right"/>
          </DetailsButton>
          <DetailsButton size={'small'}>
            Opening preview
            <ButtonArrow direction="right"/>
          </DetailsButton>
        </DetailsDropDownColumn>
      </DetailsDropDownToggle>
    </>
  )
}

interface DetailsItemLockDataProps {
  account: Account
}

export const DetailsItemLock = ({ account }: DetailsItemLockDataProps) => {
  const address = account.address
  const balance = useBalance(address)

  const [isDropped, setDropped] = useToggle()

  return (
    <>
      <AccountDetailsWrap>
        <DetailsInfo>
          <EnvelopeIcon />
          <DetailsName>Invitation lock</DetailsName>
        </DetailsInfo>
        <TokenValue value={balance?.total} />
        <TokenValue value={balance?.locked} />
        <TokenValue value={balance?.recoverable} />
        <TokenValue value={balance?.transferable} />
        <DropDownButton onClick={setDropped} isDropped={isDropped} size="medium" />
      </AccountDetailsWrap>
      <DetailsDropDownToggle isDropped={isDropped}>
        Is open
      </DetailsDropDownToggle>
    </>
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
    <>
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
    </>
  )
}

interface AccountItemDataProps {
  account: Account
}

export const AccountItem = ({ account }: AccountItemDataProps) => {
  const address = account.address
  const balance = useBalance(address)
  const isSendDisabled = !balance?.transferable || !balance.transferable.gt(new BN(0))

  const [isDropped, setDropped] = useToggle()

  return (
    <>
      <AccountItemWrap key={address}>
        <AccountInfo account={account} />
        <TokenValue value={balance?.total} />
        <TokenValue value={balance?.locked} />
        <TokenValue value={balance?.recoverable} />
        <TokenValue value={balance?.transferable} />
        <AccountControls>
          <TransferButton to={account} />
          <TransferButton from={account} disabled={isSendDisabled} />
          <DropDownButton onClick={setDropped} isDropped={isDropped} size="medium" />
        </AccountControls>
      </AccountItemWrap>
      <StyledDropDown isDropped={isDropped}>
        <StyledLabel>Account Locks:</StyledLabel>
        <DetailsItem account={account} />
        <DetailsItemLock account={account} />
      </StyledDropDown>
      <StyledDropDown isDropped={isDropped}>
        <StyledLabel>Recoverable balance</StyledLabel>
        <DetailsItemVote account={account} />
      </StyledDropDown>
    </>
  )
}

export const AccountItemWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(4, 128px) 136px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;
`

const AccountControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: 40px;
  grid-column-gap: 8px;
`
const StyledDropDown = styled(DropDownToggle)`
  padding: 16px 16px 0 16px;
  background-color: ${Colors.Black[50]};

  &:last-child {
    padding: 16px;
  }
`

const StyledLabel = styled(Label)`
  margin-bottom: 8px;
`

const AccountDetailsWrap = styled(AccountItemWrap)`
  grid-template-columns: 260px repeat(4, 133px) 115px;
  height: 46px;
  padding: 3px 16px;
  margin-top: 4px;
  border-radius: 2px;
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
  }
`

const DetailsInfo = styled.div`
  display: flex;
  width: 100%;
`

const DetailsName = styled.h6`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: ${Colors.Black[900]};
  margin-left: 16px;
`

const DetailBox = styled.div`
  //padding-right: 10px;
`

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
