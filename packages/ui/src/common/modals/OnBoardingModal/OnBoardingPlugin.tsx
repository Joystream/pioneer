import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { PolkadotIcon } from '@/common/components/icons/PolkadotIcon'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { ScrolledModalBody } from '@/common/components/Modal'
import { TextExtraHuge, TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { OnBoardingTextFooter } from '@/common/modals/OnBoardingModal/OnBoardingModal'
import { List, ListItem } from '@/common/components/List'
import { ConnectWalletItem } from '@/common/modals/OnBoardingModal/components/ConnectWalletItem'
import { getAllWallets, Wallet } from 'injectweb3-connect'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'

export const OnBoardingPlugin = () => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()
  const { setWallet } = useMyAccounts()
  const handleClick = useCallback(() => {
    if (!selectedWallet?.installed && selectedWallet?.installUrl) {
      window.open(selectedWallet.installUrl, '_blank')
    } else if (selectedWallet?.installed) {
      setWallet?.(selectedWallet.extensionName)
    }
  }, [selectedWallet])

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
                  wallet={wallet}
                  onClick={() => setSelectedWallet(wallet)}
                  selected={selectedWallet?.extensionName === wallet.extensionName}
                />
              ))}
            </ListItem>
          </List>
        </Wrapper>
      </ScrolledModalBody>
      <OnBoardingTextFooter
        text="Please reload the page after installing the plugin!"
        button={
          <StyledButton disabled={!selectedWallet} onClick={handleClick} size="large">
            {selectedWallet?.installed ? (
              'Select Wallet'
            ) : (
              <>
                <LinkSymbol />
                Install extension
              </>
            )}
          </StyledButton>
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
