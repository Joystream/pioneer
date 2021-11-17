import React from 'react'

import { OnBoardingOverlay } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { useToggle } from '@/common/hooks/useToggle'
import { OnBoardingModal } from '@/common/modals/OnBoardingModal'

export const MembershipOnBoarding = () => {
  const [membershipModal, toggleMembershipModal] = useToggle()

  return (
    <>
      <OnBoardingOverlay toggleModal={toggleMembershipModal} />
      {membershipModal && <OnBoardingModal toggleModal={toggleMembershipModal} />}
    </>
  )
}
