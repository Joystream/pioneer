import { BN_ZERO } from '@polkadot/util'
import { getWalletBySource } from 'injectweb3-connect'
import React, { useState } from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { ButtonPrimary } from '@/common/components/buttons'
import { ConnectIcon } from '@/common/components/icons/ConnectIcon'
import { JoystreamLogo } from '@/common/components/icons/JoystreamLogo'
import { List, ListItem } from '@/common/components/List'
import { ModalFooter, ScrolledModalBody } from '@/common/components/Modal'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { ConnectAccountItem } from './ConnectAccountItem'

interface Props {
  onAccountSelect?: (account: string) => void
}

const defaultIconSrc = getWalletBySource('polkadot-js')?.logo.src

export const SelectAccountStep = ({ onAccountSelect }: Props) => {
  const [selectedAccountAddress, setSelectedAccountAddress] = useState<string>()
  const { allAccounts, setWallet, wallet } = useMyAccounts()
  const balances = useMyBalances()

  const onConfirm = () => {
    if (selectedAccountAddress && onAccountSelect) onAccountSelect(selectedAccountAddress)
  }

  return (
    <>
      <ScrolledModalBody>
        <ContentWrapper>
          <IconsWrapper>
            <WalletImg src={wallet?.logo.src ?? defaultIconSrc} alt={wallet?.logo.alt ?? wallet?.extensionName} />
            <ConnectIcon />
            <JoystreamLogo />
          </IconsWrapper>
          <TextWrapper>
            <StyledTextHuge bold>Connect account</StyledTextHuge>
            <StyledSubtitle>
              Select Polkadot account which you want to connect to your new joystream membership. <br />
              Scroll down to select account on smaller screens.
            </StyledSubtitle>
          </TextWrapper>
          <StyledList>
            {allAccounts.map((account) => (
              <ListItem onClick={() => setSelectedAccountAddress(account.address)} key={account.address} borderless>
                <ConnectAccountItem
                  account={account}
                  totalBalance={balances?.[account.address]?.total ?? BN_ZERO}
                  selected={account.address === selectedAccountAddress}
                />
              </ListItem>
            ))}
          </StyledList>
        </ContentWrapper>
      </ScrolledModalBody>
      <StyledFooter>
        <ButtonPrimary size="medium" onClick={() => setWallet?.(undefined)}>
          Return to wallet selection
        </ButtonPrimary>
        <ButtonPrimary onClick={onConfirm} disabled={!selectedAccountAddress} size="medium">
          Connect Account
        </ButtonPrimary>
      </StyledFooter>
    </>
  )
}
const StyledList = styled(List)`
  width: 90%;
  margin: 10px auto 0 auto;
`

const WalletImg = styled.img`
  width: 40px;
  height: 40px;
`

const StyledFooter = styled(ModalFooter)`
  justify-items: normal;
`

const StyledTextHuge = styled(TextExtraHuge)`
  line-height: 20px;
`
const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    margin: 0 10px 0 10px;
  }
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
  height: 100%;
  margin: 24px auto 40px;
  padding: 0 0 24px;
  text-align: center;
`

const TextWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`
const StyledSubtitle = styled(TextMedium)`
  color: ${Colors.Black[500]};
  display: flex;
  margin: 8px auto 0 auto;
  width: 100%;
`
