import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { OnBoardingModalCall } from '@/common/modals/OnBoardingModal'

interface Props {
  text: string
}

export const OnBoardingButton = ({ text }: Props) => {
  const { showModal } = useModal()

  const showOnBoardingModal = useCallback(() => {
    showModal<OnBoardingModalCall>({
      modal: 'OnBoardingModal',
    })
  }, [])

  return (
    <ButtonPrimary size="large" onClick={showOnBoardingModal}>
      {text}
    </ButtonPrimary>
  )
}
