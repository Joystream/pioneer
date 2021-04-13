import Identicon from '@polkadot/react-identicon'
import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { CopyComponent } from '../../common/components/CopyComponent'
import { BorderRad, Colors } from '../../common/constants'
import { shortenAddress } from '../../common/model/formatters'
import { Address } from '../../common/types'
import { useMyMemberships } from '../../memberships/hooks/useMyMemberships'
import { MemberInternal } from '../../memberships/types'
import { Account } from '../types'

export const AccountInfo = React.memo(({ account }: { account: Account }) => {
  const { active } = useMyMemberships()

  return (
    <AccountInfoWrap>
      <AccountPhoto>
        <Identicon size={40} theme={'beachball'} value={account.address} />
      </AccountPhoto>
      {active && <OptionalAccountType active={active} address={account.address} />}
      <AccountName>{account.name}</AccountName>
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

  & ${BadgeViolet} {
    grid-area: accounttype;
  }
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
  active: MemberInternal
  address: Address
}

const OptionalAccountType = ({ active, address }: OptionalAccountTypeParams) => {
  if ((active && active.rootAccount === address) || active.controllerAccount === address) {
    return <BadgeViolet>{active.rootAccount === address ? 'Root account' : 'Controller account'}</BadgeViolet>
  }

  return null
}

const AccountCopyAddress = styled(CopyComponent)`
  grid-area: accountaddress;
`
