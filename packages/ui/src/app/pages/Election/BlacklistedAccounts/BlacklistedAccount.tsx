import { Identicon } from '@polkadot/react-identicon'
import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { AccountCopyAddress, AccountInfoWrap, AccountPhoto, PhotoWrapper } from '@/accounts/components/AccountInfo'
import { AccountRow, BalanceInfoInRow, InfoTitle, InfoValue } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { shortenAddress } from '@/common/model/formatters'

interface Prop {
  account: { address: string; balance: BN | undefined }
}

export const BlacklistedAccount = ({ account }: Prop) => {
  return (
    <BlacklistedAccountRow>
      <BlacklistedAccountInfoWrap>
        <PhotoWrapper>
          <AccountPhoto>
            <Identicon size={28} theme={'beachball'} value={account.address} />
          </AccountPhoto>
        </PhotoWrapper>
        <BlacklistedAccountCopyAddress altText={shortenAddress(account.address)} copyText={account.address} />
        <BlacklistedAccountBalance>
          <InfoTitle>Total Balance: </InfoTitle>
          <InfoValue>
            <TokenValue value={account.balance} size="xs" />
          </InfoValue>
        </BlacklistedAccountBalance>
      </BlacklistedAccountInfoWrap>
    </BlacklistedAccountRow>
  )
}
const BlacklistedAccountInfoWrap = styled(AccountInfoWrap)`
  grid-template-rows: 24px 18px;
  grid-row-gap: 4px;
  grid-template-areas:
    'accountphoto accountaddress'
    'accountphoto accountbalance';
`
const BlacklistedAccountBalance = styled(BalanceInfoInRow)`
  grid-area: accountbalance;
  display: flex;
  justify-self: start;
`
const BlacklistedAccountCopyAddress = styled(AccountCopyAddress)`
  font-size: 16px;
  color: ${Colors.Black[900]};
`
const BlacklistedAccountRow = styled(AccountRow)`
  max-width: 378px;
`
