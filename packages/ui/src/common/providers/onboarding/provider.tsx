import React from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/common/hooks/useApi'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { OnBoardingContext } from '@/common/providers/onboarding/context'
import { UseOnBoarding } from '@/common/providers/onboarding/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface Props {
  children: React.ReactNode
}

export const OnBoardingProvider = (props: Props) => {
  return <OnBoardingContext.Provider value={{ ...useOnBoarding() }}>{props.children}</OnBoardingContext.Provider>
}

const useOnBoarding = (): UseOnBoarding => {
  const { isConnected } = useApi()
  const { isLoading: isLoadingAccounts, error: accountsError, hasAccounts } = useMyAccounts()
  const { isLoading: isLoadingMembers, hasMembers } = useMyMemberships()
  const [membershipAccount, setMembershipAccount] = useLocalStorage('onboarding-membership-account')

  if (!isConnected || isLoadingAccounts || isLoadingMembers) {
    return { isLoading: true }
  }

  if (accountsError === 'EXTENSION') {
    return { isLoading: false, status: 'installPlugin' }
  }

  if (!hasAccounts || !membershipAccount) {
    return { isLoading: false, status: 'addAccount', setMembershipAccount }
  }

  if (!hasMembers && membershipAccount) {
    return { isLoading: false, status: 'createMembership' }
  }

  return { isLoading: false, status: 'finished' }
}
