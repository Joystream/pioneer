import React, { useMemo } from 'react'
import styled from 'styled-components'

import { asOnBoardingSteps, onBoardingSteps } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { CloseButton } from '@/common/components/buttons'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { Modal, ModalFooter } from '@/common/components/Modal'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useOnBoardingStatus } from '@/common/hooks/useOnBoardingStatus'
import { OnBoardingAccount } from '@/common/modals/OnBoardingModal/OnBoardingAccount'
import { OnBoardingPlugin } from '@/common/modals/OnBoardingModal/OnBoardingPlugin'

export const OnBoardingModal = () => {
  const { isLoading, status } = useOnBoardingStatus()
  const { hideModal } = useModal()

  const step = useMemo(() => {
    switch (status) {
      case 'installPlugin':
        return <OnBoardingPlugin />
      case 'addAccount':
        return <OnBoardingAccount />
      default:
        return null
    }
  }, [status])

  if (isLoading || !status) {
    return null
  }

  return (
    <StyledModal onClose={hideModal} modalSize="m">
      <StepperWrapper>
        <HorizontalStepper steps={asOnBoardingSteps(onBoardingSteps, status)} />
        <StyledCloseButton onClick={hideModal} />
      </StepperWrapper>
      {step}
    </StyledModal>
  )
}

export const OnBoardingTextFooter = ({ text }: { text: string }) => (
  <OnBoardingTextFooterWrapper>
    <WarningIcon />
    <TextMedium>{text}</TextMedium>
  </OnBoardingTextFooterWrapper>
)

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  right: 10px;
  top: 10px;
`

const StepperWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: grid;
  place-items: center;
  position: relative;
  background-color: ${Colors.Black[700]};

  > *:first-child {
    width: 80%;
  }
`

const StyledModal = styled(Modal)`
  > *:last-child {
    background-color: ${Colors.Black[100]};
  }
`

const OnBoardingTextFooterWrapper = styled(ModalFooter)`
  display: flex;
  grid-column-gap: 5px;
  justify-items: center;
  justify-content: center;
`
