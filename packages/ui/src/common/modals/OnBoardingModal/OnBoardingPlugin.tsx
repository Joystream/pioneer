import React, { useCallback } from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { PolkadotIcon } from '@/common/components/icons/PolkadotIcon'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { ScrolledModalBody } from '@/common/components/Modal'
import { TextExtraHuge, TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { OnBoardingTextFooter } from '@/common/modals/OnBoardingModal/OnBoardingModal'

export const OnBoardingPlugin = () => {
  const openLink = useCallback(() => {
    window.open('https://polkadot.js.org/extension/', '_blank')
  }, [])

  return (
    <>
      <ScrolledModalBody>
        <Wrapper>
          <TextMedium lighter>
            We notice you don't have a Polkadot.js extension yet. To apply to an opening you need to connect you
            Polkadot.js extension with Joystream and then create your membership
          </TextMedium>
          <PolkadotIcon />
          <TextExtraHuge bold>Install Polkadot plugin</TextExtraHuge>
          <TextSmall>Please enable Polkadot extension or install it using following plugin link.</TextSmall>
          <ButtonPrimary onClick={openLink} size="large">
            <LinkSymbol />
            Install extension
          </ButtonPrimary>
        </Wrapper>
      </ScrolledModalBody>
      <OnBoardingTextFooter text="Please reload the page after installing the plugin!" />
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
  height: 100%;
  margin: 0 auto;
  padding: 36px 0 24px;
  text-align: center;

  > *:first-child {
    margin-bottom: 52px;
  }

  > *:nth-child(2) {
    margin-bottom: 10px;
  }

  > *:nth-child(4) {
    color: ${Colors.Black[500]};
    max-width: 250px;
    text-align: center;
    margin-top: 8px;
    margin-bottom: 30px;
  }

  > button {
    path {
      fill: ${Colors.White} !important;
    }
  }
`
