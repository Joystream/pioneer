import { createContext } from 'react'

import { UseOnBoarding } from '@/common/providers/onboarding/types'

export const OnBoardingContext = createContext<UseOnBoarding>({
  membership: {
    isLoading: false,
    status: undefined,
    toggleModal: () => {
      /**/
    },
    isModalOpen: false,
  },
})
