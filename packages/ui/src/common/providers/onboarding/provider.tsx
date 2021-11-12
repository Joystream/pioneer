import React from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/common/hooks/useApi'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useToggle } from '@/common/hooks/useToggle'
import { OnBoardingContext } from '@/common/providers/onboarding/context'
import { UseMembershipOnBoarding } from '@/common/providers/onboarding/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

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

const useMembershipOnBoarding = (localStorageValue: string | undefined): UseMembershipOnBoarding => {
  const { isConnected } = useApi()
  const { isLoading: isLoadingAccounts, error: accountsError, hasAccounts } = useMyAccounts()
  const { isLoading: isLoadingMembers, hasMembers } = useMyMemberships()

  if (!isConnected || isLoadingAccounts || isLoadingMembers) {
    return { isLoading: true }
  }

  if (accountsError === 'EXTENSION') {
    return { isLoading: false, status: 'installPlugin' }
  }

  if (!hasAccounts || (!localStorageValue && !hasMembers)) {
    return { isLoading: false, status: 'addAccount' }
  }

  if (!hasMembers && localStorageValue !== 'redeemed') {
    return { isLoading: false, status: 'getFreeTokens' }
  }

  if (!hasMembers && localStorageValue === 'redeemed') {
    return { isLoading: false, status: 'createMembership' }
  }

  return { isLoading: false, status: 'finished' }
}
