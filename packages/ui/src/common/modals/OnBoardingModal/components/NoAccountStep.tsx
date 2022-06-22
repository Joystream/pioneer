import React from 'react'
import styled from 'styled-components'

import accountImg from '@/app/assets/images/OnBoarding/accountImage.png'
import { ScrolledModalBody } from '@/common/components/Modal'
import { HorizontalStaticStepper } from '@/common/components/Stepper/HorizontalStaticStepper'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'
import { OnBoardingTextFooter } from '@/common/modals/OnBoardingModal'

const steps = [
  'Open the extension with the icon in your browser bar',
  'Create an account according to the displayed instructions',
]

export const NoAccountStep = () => {
  return (
    <>
      <ScrolledModalBody>
        <Wrapper>
          <AccountImage src={accountImg} />
          <TextExtraHuge bold>Create an account</TextExtraHuge>
          <HorizontalStaticStepper steps={steps} />
        </Wrapper>
      </ScrolledModalBody>
      <OnBoardingTextFooter text="Please reload the page after account creation!" />
    </>
  )
}

const AccountImage = styled.img`
  object-fit: contain;
  width: 80px;
  margin: 40px 0 20px 0;
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

  > *:nth-child(2) {
    margin-bottom: 30px;
  }

  > *:nth-child(4) {
    height: 100px;
    margin-top: 20px;
  }
`
