import { getWalletBySource, Wallet } from 'injectweb3-connect'
import React from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ButtonGhost, ButtonPrimary, CloseButton } from '@/common/components/buttons'
import { Modal } from '@/common/components/Modal'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useModal } from '@/common/hooks/useModal'
import { SignOutModalCall } from '@/memberships/modals/SignOutModal/types'

const defaultIconSrc = getWalletBySource('polkadot-js')?.logo.src

export const DisconnectWalletModal = () => {
  const { wallet, setWallet } = useMyAccounts()
  const [, setSelectedWallet] = useLocalStorage<Wallet | undefined>('recentWallet')
  const { hideModal } = useModal<SignOutModalCall>()

  const DisconnectWallet = () => {
    hideModal()
    setWallet?.(undefined)
    setSelectedWallet(undefined)
  }
  return (
    <Modal modalSize="xs" modalHeight="s" isDark onClose={hideModal}>
      <DisconnectButtonWrapper>
        <CloseButton onClick={hideModal} />
      </DisconnectButtonWrapper>
      <AvatarWrapper>
        <img src={wallet?.logo.src ?? defaultIconSrc} alt={wallet?.logo.alt ?? wallet?.extensionName} />
      </AvatarWrapper>
      <ContentWrapper>
        <TextHuge>Disconnect Wallet ?</TextHuge>
        <StyledText>You can sign back in anytime</StyledText>
      </ContentWrapper>
      <ButtonWrapper>
        <StyledCancelButton size="large" onClick={hideModal}>
          Cancel
        </StyledCancelButton>
        <ButtonPrimary size="large" onClick={() => DisconnectWallet()}>
          Disconnect
        </ButtonPrimary>
      </ButtonWrapper>
    </Modal>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
`
const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 36px 0 24px 0;
`

const StyledText = styled(TextMedium)`
  padding-top: 16px;
  color: ${Colors.Black[400]};
`
const ButtonWrapper = styled.div`
  padding: 35px 0 16px 0;
  justify-content: end;
  display: flex;
  width: 95%;
`

const StyledCancelButton = styled(ButtonGhost)`
  margin-right: 10px;
`
const DisconnectButtonWrapper = styled.div`
  padding: 26px 26px 0 0;
  display: flex;
  justify-content: end;
`
