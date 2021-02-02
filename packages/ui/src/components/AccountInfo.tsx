import Identicon from '@polkadot/react-identicon'
import React from 'react'
import styled from 'styled-components'
import { Account } from '../hooks/types'
import { BorderRad, Colors } from '../constants'
import { CopyButton } from './buttons/CopyButton'

export const AccountInfo = ({ account }: { account: Account }) => {
  return (
    <AccountInfoWrap>
      <AccountPhoto>
        <Identicon size={40} theme={'beachball'} value={account.address} />
      </AccountPhoto>
      <AccountName>{account.name}</AccountName>
      <AccountCopyAddress>
        <AccountAddress>{account.address}</AccountAddress>
        <AccountCopyButton />
      </AccountCopyAddress>
    </AccountInfoWrap>
  )
}
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
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
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
