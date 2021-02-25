import Identicon from '@polkadot/react-identicon'
import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../api/queries'
import { BorderRad, Colors } from '../constants'
import { Account, Address } from '../common/types'
import { useMembership } from '../hooks/useMembership'
import { CopyButton } from './buttons'

export const AccountInfo = React.memo(({ account }: { account: Account }) => {
  const { active } = useMembership()

  return (
    <AccountInfoWrap>
      <AccountPhoto>
        <Identicon size={40} theme={'beachball'} value={account.address} />
      </AccountPhoto>
      {active && <OptionalAccountType active={active} address={account.address} />}
      <AccountName>{account.name}</AccountName>
      <AccountCopyAddress>
        <AccountAddress>{account.address}</AccountAddress>
        <AccountCopyButton />
      </AccountCopyAddress>
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
`

const AccountPhoto = styled.div`
  display: flex;
  grid-area: accountphoto;
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

const AccountName = styled.h5`
  grid-area: accountname;
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface OptionalAccountTypeParams {
  active: MemberFieldsFragment
  address: Address
}

const OptionalAccountType = ({ active, address }: OptionalAccountTypeParams) => {
  if ((active && active.rootAccount === address) || active.controllerAccount === address) {
    return <AccountType>{active.rootAccount === address ? 'Root account' : 'Controller account'}</AccountType>
  }

  return null
}

const AccountType = styled.p`
  display: flex;
  grid-area: accounttype;
  justify-content: center;
  width: fit-content;
  margin: 0;
  padding: 0 8px;
  font-size: 10px;
  line-height: 16px;
  border-radius: 8px;
  color: ${Colors.White};
  background-color: ${Colors.Blue[200]};
  text-transform: uppercase;
`

const AccountCopyAddress = styled.div`
  display: flex;
  grid-area: accountaddress;
  color: ${Colors.Black[400]};
`

const AccountAddress = styled.span`
  max-width: 152px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.Black[400]};
`

const AccountCopyButton = styled(CopyButton)`
  color: ${Colors.Black[400]};
`
