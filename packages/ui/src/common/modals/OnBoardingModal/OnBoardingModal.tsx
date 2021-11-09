import React, { useMemo } from 'react'
import styled from 'styled-components'

import { asOnBoardingSteps, onBoardingSteps } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { CloseButton } from '@/common/components/buttons'
import { Modal } from '@/common/components/Modal'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useOnBoardingStatus } from '@/common/hooks/useOnBoardingStatus'
import { OnBoardingPlugin } from '@/common/modals/OnBoardingModal/OnBoardingPlugin'

export const OnBoardingModal = () => {
  const { isLoading, status } = useOnBoardingStatus()
  const { hideModal } = useModal()

  const step = useMemo(() => {
    switch (status) {
      case 'installPlugin':
        return <OnBoardingPlugin />
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
    display: flex;
    justify-content: center;
  }
`
