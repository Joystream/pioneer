import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { OnBoardingModalCall } from '@/common/modals/OnBoardingModal'

interface Props {
  children: string
}

export const OnBoardingButton = ({ children }: Props) => {
  const { showModal } = useModal()

  const showOnBoardingModal = useCallback(() => {
    showModal<OnBoardingModalCall>({
      modal: 'OnBoardingModal',
    })
  }, [])

  return (
    <ButtonPrimary size="large" onClick={showOnBoardingModal}>
      {children}
    </ButtonPrimary>
  )
}
