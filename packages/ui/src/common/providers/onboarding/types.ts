export type OnBoardingStatus = 'installPlugin' | 'addAccount' | 'getFreeTokens' | 'createMembership' | 'finished'

export interface UseOnBoarding {
  isLoading: boolean
  status?: OnBoardingStatus
  setMembershipAccount?: (value: string) => void
}
