import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { ConnectIcon } from '@/common/components/icons/ConnectIcon'
import { JoystreamLogo } from '@/common/components/icons/JoystreamLogo'
import { PolkadotIcon } from '@/common/components/icons/PolkadotIcon'
import { ModalFooter } from '@/common/components/Modal'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'

export const SelectAccountStep = () => {
  return (
    <>
      <ContentWrapper>
        <IconsWrapper>
          <PolkadotIcon />
          <ConnectIcon />
          <JoystreamLogo />
        </IconsWrapper>
        <TextExtraHuge bold>Connect accounts</TextExtraHuge>
        <TextMedium>Select polkadot account which you want to connect to your new joystream membership.</TextMedium>
      </ContentWrapper>
      <StyledModalFooter>
        <ButtonPrimary size="large">Connect Account</ButtonPrimary>
      </StyledModalFooter>
    </>
  )
}

const StyledModalFooter = styled(ModalFooter)`
  grid-column-gap: 5px;
  justify-items: end;
`
const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
