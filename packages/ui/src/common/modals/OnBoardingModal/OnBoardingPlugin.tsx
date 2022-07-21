import { getAllWallets, Wallet } from 'injectweb3-connect'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ButtonPrimary } from '@/common/components/buttons'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { List, ListItem } from '@/common/components/List'
import { ScrolledModalBody } from '@/common/components/Modal'
import { TextBig, TextExtraHuge, TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { ConnectWalletItem } from '@/common/modals/OnBoardingModal/components/ConnectWalletItem'
import { OnBoardingTextFooter } from '@/common/modals/OnBoardingModal/OnBoardingModal'

export const OnBoardingPlugin = () => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()
  const { setWallet, error } = useMyAccounts()
  const handleClick = useCallback(() => {
    if (!selectedWallet?.installed && selectedWallet?.installUrl) {
      window.open(selectedWallet.installUrl, '_blank')
    } else if (selectedWallet?.installed) {
      setWallet?.(selectedWallet)
    }
  }, [selectedWallet])

  useEffect(() => {
    if (error === 'APP_REJECTED') {
      setSelectedWallet(undefined)
    }
  }, [error])

  return (
    <>
      <ScrolledModalBody>
        <Wrapper>
          <TextExtraHuge bold>Select Wallet</TextExtraHuge>
          <TextSmall>Select which wallet you want to use to connect with.</TextSmall>
          <List>
            <ListItem>
              {getAllWallets().map((wallet) => (
                <ConnectWalletItem
                  key={wallet.extensionName}
                  wallet={wallet}
                  onClick={() => setSelectedWallet(wallet)}
                  selected={selectedWallet?.extensionName === wallet.extensionName}
                />
              ))}
            </ListItem>
          </List>
        </Wrapper>
        {error === 'APP_REJECTED' && (
          <RedBox>
            <TextBig bold value>
              Extension is blocking Pioneer from access
            </TextBig>
            <TextMedium lighter>
              Change the settings of the wallet browser plugin to allow it access to dao.joystream.org and reload the
              page
            </TextMedium>
          </RedBox>
        )}
      </ScrolledModalBody>
      <OnBoardingTextFooter
        text="Please reload the page after installing the plugin!"
        button={
          <>
            <StyledButton disabled={!selectedWallet} onClick={handleClick} size="medium">
              {selectedWallet?.installed ? (
                'Select Wallet'
              ) : (
                <>
                  <LinkSymbol />
                  Install extension
                </>
              )}
            </StyledButton>
          </>
        }
      />
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  max-width: 640px;
  height: 100%;
  margin: 0 auto;
  padding: 36px 0 24px;
  text-align: center;

  > *:nth-child(2) {
    color: ${Colors.Black[400]};
  }
`

const StyledButton = styled(ButtonPrimary)`
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
