export type OnBoardingStatus = 'installPlugin' | 'addAccount' | 'createMembership' | 'finished'
export type SetMembershipAccount = (value: string | undefined) => void

export interface UseOnBoarding {
  isLoading: boolean
  status?: OnBoardingStatus
  membershipAccount?: string
  setMembershipAccount?: SetMembershipAccount
}
