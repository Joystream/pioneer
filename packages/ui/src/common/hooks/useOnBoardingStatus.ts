import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/common/hooks/useApi'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export type OnBoardingStatus = 'installPlugin' | 'addAccount' | 'getFreeTokens' | 'createMembership' | 'finished'

interface UseOnBoardingStatus {
  isLoading: boolean
  status?: OnBoardingStatus
}

export const useOnBoardingStatus = (): UseOnBoardingStatus => {
  const { isConnected } = useApi()
  const { isLoading: isLoadingAccounts, error: accountsError, hasAccounts } = useMyAccounts()
  const { isLoading: isLoadingMembers, hasMembers } = useMyMemberships()
  const [freeTokensAccount] = useLocalStorage<string>('free-tokens-account')

  if (!isConnected || isLoadingAccounts || isLoadingMembers) {
    return { isLoading: true }
  }

  if (accountsError === 'EXTENSION') {
    return { isLoading: false, status: 'installPlugin' }
  }

  if (!hasAccounts || (!freeTokensAccount && !hasMembers)) {
    return { isLoading: false, status: 'addAccount' }
  }

  if (!hasMembers) {
    return { isLoading: false, status: 'createMembership' }
  }

  return { isLoading: false, status: 'finished' }
}
