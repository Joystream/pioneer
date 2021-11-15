export type OnBoardingStatus = 'installPlugin' | 'addAccount' | 'getFreeTokens' | 'createMembership' | 'finished'

export interface UseMembershipOnBoarding {
  isLoading: boolean
  status?: OnBoardingStatus
}

export interface UseOnBoarding extends UseMembershipOnBoarding {
  setFreeTokens?: (value: string) => void
}
