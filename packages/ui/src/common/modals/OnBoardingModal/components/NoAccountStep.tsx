import React from 'react'
import styled from 'styled-components'

import polkadotAccount from '@/app/assets/images/OnBoarding/PolkadotAddAccount.png'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { ModalFooter } from '@/common/components/Modal'
import { HorizontalStaticStepper } from '@/common/components/Stepper/HorizontalStaticStepper'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'

const steps = [
  'Open the extension with the icon in your browser bar.',
  'Click the plus icon',
  'Continue with instructions presented on the screen ',
]

export const NoAccountStep = () => {
  return (
    <>
      <Wrapper>
        <AccountImage src={polkadotAccount} />
        <TextExtraHuge bold>Create an account</TextExtraHuge>
        <TextMedium>Follow instructions to create an account</TextMedium>
        <HorizontalStaticStepper steps={steps} />
      </Wrapper>
      <StyledModalFooter>
        <WarningIcon />
        <TextMedium>Make sure to safely save your seed phrase!</TextMedium>
      </StyledModalFooter>
    </>
  )
}

const AccountImage = styled.img`
  object-fit: contain;
  width: 40%;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > *:nth-child(1) {
    width: 40%;
    height: 200px;
    margin-bottom: 20px;
  }

  > *:nth-child(2) {
    margin-bottom: 8px;
  }

  > *:nth-child(4) {
    width: 90%;
    height: 100px;
    margin: 20px 0;
  }
`

const StyledModalFooter = styled(ModalFooter)`
  grid-column-gap: 5px;
`
