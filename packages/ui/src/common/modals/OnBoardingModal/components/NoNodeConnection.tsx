import { styled } from '@storybook/theming'
import React from 'react'

import { ScrolledModalBody } from '@/common/components/Modal'
import { TextHuge } from '@/common/components/typography'
import { OnBoardingTextFooter } from '@/common/modals/OnBoardingModal'

import { ResetWalletButton } from './ResetWalletButton'

export const NoNodeConnection = () => (
  <>
    <ScrolledModalBody>
      <Wrapper>
        <TextHuge>Please wait for node connection to continue the process</TextHuge>
      </Wrapper>
    </ScrolledModalBody>
    <OnBoardingTextFooter text="Please reload the page after account creation!" button={<ResetWalletButton />} />
  </>
)

const Wrapper = styled.div`
  padding: 32px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`
