import React from 'react'
import styled from 'styled-components'

import polkadotAccount from '@/app/assets/images/OnBoarding/PolkadotAddAccount.png'
import { ScrolledModalBody } from '@/common/components/Modal'
import { HorizontalStaticStepper } from '@/common/components/Stepper/HorizontalStaticStepper'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'
import { OnBoardingTextFooter } from '@/common/modals/OnBoardingModal'

const steps = [
  'Open the extension with the icon in your browser bar.',
  'Click the plus icon',
  'Continue with instructions presented on the screen ',
]

export const NoAccountStep = () => {
  return (
    <>
      <ScrolledModalBody>
        <Wrapper>
          <AccountImage src={polkadotAccount} />
          <TextExtraHuge bold>Create an account</TextExtraHuge>
          <TextMedium>Follow instructions to create an account</TextMedium>
          <HorizontalStaticStepper steps={steps} />
        </Wrapper>
      </ScrolledModalBody>
      <OnBoardingTextFooter text="Make sure to safely save your seed phrase!" />
    </>
  )
}

const AccountImage = styled.img`
  object-fit: contain;
  width: 40%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
  height: 100%;
  margin: 0 auto;
  padding: 0 0 24px;
  text-align: center;

  > *:nth-child(1) {
    width: 40%;
    height: 200px;
    margin-bottom: 20px;
  }

  > *:nth-child(2) {
    margin-bottom: 8px;
  }

  > *:nth-child(4) {
    height: 100px;
    margin-top: 20px;
  }
`
