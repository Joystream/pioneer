import { Identicon } from '@polkadot/react-identicon'
import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { CopyComponent } from '@/common/components/CopyComponent'
import { LockIcon } from '@/common/components/icons/locks'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { shortenAddress } from '@/common/model/formatters'
import { Address } from '@/common/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

import { Account } from '../types'

interface AccountInfoProps {
  account: Account
  locked?: boolean
}

export const AccountInfo = React.memo(({ account, locked }: AccountInfoProps) => {
  const { active } = useMyMemberships()

  return (
    <AccountInfoWrap>
      <PhotoWrapper>
        <AccountPhoto>
          <Identicon size={40} theme={'beachball'} value={account.address} />
        </AccountPhoto>
        {locked && (
          <LockIconWrapper>
            <StyledLockIcon />
          </LockIconWrapper>
        )}
      </PhotoWrapper>
      {active && <OptionalAccountType active={active} address={account.address} />}
      <AccountName className="accountName" locked={locked}>
        {account.name}
      </AccountName>
      <AccountCopyAddress altText={shortenAddress(account.address)} copyText={account.address} />
    </AccountInfoWrap>
  )
})

const AccountInfoWrap = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: min-content 24px 18px;
  grid-column-gap: 12px;
  grid-template-areas:
    'accountphoto accounttype'
    'accountphoto accountname'
    'accountphoto accountaddress';
  align-items: center;
  width: 100%;
  justify-self: start;

  & ${BadgeStatus} {
    grid-area: accounttype;
  }
`

const AccountPhoto = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  align-self: center;
  height: 40px;
  width: 40px;
  background-color: ${Colors.Blue[500]};
  border-radius: ${BorderRad.full};
  overflow: hidden;
`

const PhotoWrapper = styled.div`
  grid-area: accountphoto;
  position: relative;
`

const LockIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${Colors.White};
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLockIcon = styled(LockIcon)`
  width: 12px;
  height: 12px;
`

const AccountName = styled.h5<{ locked?: boolean }>`
  grid-area: accountname;
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${({ locked }) => (locked ? Colors.Black[500] : Colors.Black[900])};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  transition: ${Transitions.all};
`

interface OptionalAccountTypeParams {
  active: Member
  address: Address
}

const OptionalAccountType = ({ active, address }: OptionalAccountTypeParams) => {
  if ((active && active.rootAccount === address) || active.controllerAccount === address) {
    return <BadgeStatus>{active.rootAccount === address ? 'Root account' : 'Controller account'}</BadgeStatus>
  }

  return null
}

const AccountCopyAddress = styled(CopyComponent)`
  grid-area: accountaddress;
`
