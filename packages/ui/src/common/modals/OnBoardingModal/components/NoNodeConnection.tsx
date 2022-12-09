import { styled } from '@storybook/theming'
import React from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ButtonPrimary } from '@/common/components/buttons'
import { ScrolledModalBody } from '@/common/components/Modal'
import { TextHuge } from '@/common/components/typography'
import { OnBoardingTextFooter } from '@/common/modals/OnBoardingModal'

export const NoNodeConnection = () => {
  const { setWallet } = useMyAccounts()

  return (
    <>
      <ScrolledModalBody>
        <Wrapper>
          <TextHuge>Please wait for node connection to continue the process</TextHuge>
        </Wrapper>
      </ScrolledModalBody>
      <OnBoardingTextFooter
        text="Please reload the page after account creation!"
        button={
          <ButtonPrimary size="medium" onClick={() => setWallet?.(undefined)}>
            Return to wallet selection
          </ButtonPrimary>
        }
      />
    </>
  )
}
const Wrapper = styled.div`
  padding: 32px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`
