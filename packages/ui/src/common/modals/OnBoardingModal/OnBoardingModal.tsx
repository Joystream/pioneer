import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { Modal } from '@/common/components/Modal'
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

  if (isLoading) {
    return <Loading />
  }

  return (
    <StyledModal onClose={hideModal} modalSize="m">
      <StepperPlaceholder />
      {step}
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  > *:last-child {
    background-color: ${Colors.Black[100]};
    display: flex;
    justify-content: center;
  }
`

const StepperPlaceholder = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${Colors.Black[700]};
`
