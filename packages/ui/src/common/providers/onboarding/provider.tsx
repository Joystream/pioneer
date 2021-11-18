import React from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/common/hooks/useApi'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { OnBoardingContext } from '@/common/providers/onboarding/context'
import { UseMembershipOnBoarding } from '@/common/providers/onboarding/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface Props {
  children: React.ReactNode
}

export const OnBoardingProvider = (props: Props) => {
  const membershipOnBoarding = useMembershipOnBoarding()

  return <OnBoardingContext.Provider value={{ ...membershipOnBoarding }}>{props.children}</OnBoardingContext.Provider>
}

const useMembershipOnBoarding = (): UseMembershipOnBoarding => {
  const { isConnected } = useApi()
  const { isLoading: isLoadingAccounts, error: accountsError, hasAccounts } = useMyAccounts()
  const { isLoading: isLoadingMembers, hasMembers } = useMyMemberships()

  if (!isConnected || isLoadingAccounts || isLoadingMembers) {
    return { isLoading: true }
  }

  if (accountsError === 'EXTENSION') {
    return { isLoading: false, status: 'installPlugin' }
  }

  if (!hasAccounts) {
    return { isLoading: false, status: 'addAccount' }
  }

  if (!hasMembers) {
    return { isLoading: false, status: 'createMembership' }
  }

  return { isLoading: false, status: 'finished' }
}
