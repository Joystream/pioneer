import { useContext } from 'react'

import { OnBoardingContext } from '@/common/providers/onboarding/context'

export const useOnBoarding = () => useContext(OnBoardingContext)
