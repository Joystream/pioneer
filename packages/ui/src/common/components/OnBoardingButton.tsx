import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'

interface Props {
  children: string
}

export const OnBoardingButton = ({ children }: Props) => {
  const {
    membership: { toggleModal },
  } = useOnBoarding()

  return (
    <ButtonPrimary size="large" onClick={toggleModal}>
      {children}
    </ButtonPrimary>
  )
}
