import React from 'react'
import styled from 'styled-components'

import reCAPTCHA from '@/app/assets/images/OnBoarding/reCAPTCHA.png'
import { ButtonPrimary } from '@/common/components/buttons'
import { ModalFooter, ScrolledModalBody } from '@/common/components/Modal'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  onRedemption: () => void
}

export const OnBoardingTokens = ({ onRedemption }: Props) => {
  return (
    <>
      <ScrolledModalBody>
        <Wrapper>
          <TextExtraHuge bold>One Last Thing</TextExtraHuge>
          <TextMedium>To receive free tokens. Please confirm that you are not a robot.</TextMedium>
          <ReCAPTCHA src={reCAPTCHA} />
        </Wrapper>
      </ScrolledModalBody>
      <ModalFooter>
        <ButtonPrimary onClick={onRedemption} size="medium">
          Continue and Get Tokens
        </ButtonPrimary>
      </ModalFooter>
    </>
  )
}

const ReCAPTCHA = styled.img`
  object-fit: contain;
  width: 35%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
  height: 100%;
  margin: 0 auto;
  margin: 64px auto 24px;
  padding: 0 24px;
  text-align: center;

  > *:nth-child(2) {
    margin: 8px 0 64px 0;
    color: ${Colors.Black[500]};
  }
`
