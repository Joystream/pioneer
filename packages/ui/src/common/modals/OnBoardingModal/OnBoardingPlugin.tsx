import { Wallet } from 'injectweb3-connect'
import React, { useState } from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ButtonPrimary } from '@/common/components/buttons'
import { LinkPrimary } from '@/common/components/buttons/Links'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { List, ListItem } from '@/common/components/List'
import { ScrolledModalBody } from '@/common/components/Modal'
import { TextBig, TextExtraHuge, TextMedium, TextSmall } from '@/common/components/typography'
import { BreakPoints, Colors } from '@/common/constants'
import { ConnectWalletItem } from '@/common/modals/OnBoardingModal/components/ConnectWalletItem'
import { OnBoardingTextFooter } from '@/common/modals/OnBoardingModal/OnBoardingModal'

export const OnBoardingPlugin = () => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()
  const { allWallets, setWallet, walletState } = useMyAccounts()

  return (
    <>
      <ScrolledModalBody>
        <Wrapper>
          <TextExtraHuge as="h3" bold>
            Select Wallet
          </TextExtraHuge>
          <TextSmall>Select which wallet you want to use to connect with.</TextSmall>
          <List>
            {allWallets.map((wallet) => (
              <ListItem key={wallet.extensionName}>
                <ConnectWalletItem
                  key={wallet.extensionName}
                  wallet={wallet}
                  onClick={() => setSelectedWallet(wallet)}
                  selected={selectedWallet?.extensionName === wallet.extensionName}
                />
              </ListItem>
            ))}
          </List>
        </Wrapper>
        {walletState === 'APP_REJECTED' && (
          <RedBox>
            <TextBig bold value>
              Extension is blocking Pioneer from access
            </TextBig>
            <TextMedium lighter>
              Change the settings of the wallet browser plugin to allow it access to {window.location.host} and reload
              the page
            </TextMedium>
          </RedBox>
        )}
      </ScrolledModalBody>
      <WalletSelectionFooter selectedWallet={selectedWallet} setWallet={setWallet} />
    </>
  )
}

type WalletSelectionFooterProps = {
  selectedWallet: Wallet | undefined
  setWallet?: (wallet: Wallet | undefined) => void
}

const WalletSelectionFooter = ({ selectedWallet, setWallet }: WalletSelectionFooterProps) => {
  const isInstalledWallet = selectedWallet?.installed
  const recommendedWalletUrl = !isInstalledWallet && selectedWallet?.installUrl

  if (recommendedWalletUrl) {
    return (
      <OnBoardingTextFooter
        text="Please reload the page after installing the plugin!"
        button={
          <StyledLink size="medium" href={recommendedWalletUrl}>
            <LinkSymbol /> Install extension
          </StyledLink>
        }
      />
    )
  }

  return (
    <OnBoardingTextFooter
      button={
        <StyledButton size="medium" onClick={() => setWallet?.(selectedWallet)} disabled={!selectedWallet}>
          Select Wallet
        </StyledButton>
      }
    />
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  max-width: 592px;
  height: 100%;
  margin: 0 auto;
  padding: 36px 12px 24px;
  text-align: center;

  > *:nth-child(2) {
    color: ${Colors.Black[400]};
  }

  @media (min-width: ${BreakPoints.sm}px) {
    padding: 36px 24px 24px;
  }
`

const StyledLink = styled(LinkPrimary)`
  margin-left: auto;
  path {
    fill: ${Colors.White} !important;
  }
`
const StyledButton = styled(ButtonPrimary)`
  margin-left: auto;
  path {
    fill: ${Colors.White} !important;
  }
`

export const RedBox = styled.div`
  display: grid;
  width: 90%;
  gap: 5px;
  margin-bottom: 20px;
  padding: 16px 24px;
  background-color: ${Colors.Negative[50]};
  align-self: center;
`
