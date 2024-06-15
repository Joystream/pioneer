import { Identicon } from '@polkadot/react-identicon'
import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { CopyComponent } from '@/common/components/CopyComponent'
import { AccountRow, InfoTitle, InfoValue } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { shortenAddress } from '@/common/model/formatters'

type Props = {
  address: string
  amount?: BN
  addressLength?: number
}

export const AnonymousAccount = ({ address, amount, addressLength }: Props) => {
  return (
    <StyledAccountRow>
      <Identicon size={40} theme={'beachball'} value={address} />
      <Info>
        <AccountCopyAddress altText={shortenAddress(address, addressLength)} copyText={address} />
        {amount && (
          <BalanceInfo>
            <InfoTitle>Total Balance: </InfoTitle>
            <InfoValue>
              <TokenValue value={amount} size="xs" />
            </InfoValue>
          </BalanceInfo>
        )}
      </Info>
    </StyledAccountRow>
  )
}

const StyledAccountRow = styled(AccountRow)`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const AccountCopyAddress = styled(CopyComponent)`
  font-size: 16px;
  color: ${Colors.Black[900]};
`

const BalanceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`
