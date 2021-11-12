import { UseMembershipOnBoarding } from '@/common/hooks/useMembershipOnBoarding'

interface MembershipOnBoarding extends UseMembershipOnBoarding {
  setFreeTokens?: (value: string) => void
  isModalOpen: boolean
  toggleModal: () => void
}

export interface UseOnBoarding {
  membership: MembershipOnBoarding
}
