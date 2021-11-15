import { createContext } from 'react'

import { UseOnBoarding } from '@/common/providers/onboarding/types'

export const OnBoardingContext = createContext<UseOnBoarding>({
  isLoading: false,
  status: undefined,
})
