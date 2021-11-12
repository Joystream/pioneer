import React from 'react'

import { OnBoardingOverlay } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { OnBoardingModal } from '@/common/modals/OnBoardingModal'

export const MembershipOnBoarding = () => {
  const {
    membership: { isModalOpen },
  } = useOnBoarding()

  return (
    <>
      <OnBoardingOverlay />
      {isModalOpen && <OnBoardingModal />}
    </>
  )
}
