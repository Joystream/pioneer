import React from 'react'

import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useMembershipOnBoarding } from '@/common/hooks/useMembershipOnBoarding'
import { useToggle } from '@/common/hooks/useToggle'
import { OnBoardingContext } from '@/common/providers/onboarding/context'

interface Props {
  children: React.ReactNode
}

export const OnBoardingProvider = (props: Props) => {
  const [membershipModal, toggleMembershipModal] = useToggle()
  const [membershipOnBoardingValue, setMembershipOnBoardingValue] = useLocalStorage<string>('onboarding-intro')
  const membership = useMembershipOnBoarding(membershipOnBoardingValue)

  const value = {
    membership: {
      ...membership,
      setFreeTokens: setMembershipOnBoardingValue,
      isModalOpen: membershipModal,
      toggleModal: toggleMembershipModal,
    },
  }

  return <OnBoardingContext.Provider value={{ ...value }}>{props.children}</OnBoardingContext.Provider>
}
