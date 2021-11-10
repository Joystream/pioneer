import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/common/hooks/useApi'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export type OnBoardingStatus = 'installPlugin' | 'addAccount' | 'getFreeTokens' | 'createMembership' | 'finished'

interface UseOnBoardingStatus {
  isLoading: boolean
  status?: OnBoardingStatus
  setFreeTokens?: any
  setRedeemedTokens?: any
}

export const useOnBoardingStatus = (): UseOnBoardingStatus => {
  const { isConnected } = useApi()
  const { isLoading: isLoadingAccounts, error: accountsError, hasAccounts } = useMyAccounts()
  const { isLoading: isLoadingMembers, hasMembers } = useMyMemberships()
  const [freeTokens, setFreeTokens] = useLocalStorage<string>('free-tokens')

  if (!isConnected || isLoadingAccounts || isLoadingMembers) {
    return { isLoading: true }
  }

  if (accountsError === 'EXTENSION') {
    return { isLoading: false, status: 'installPlugin' }
  }

  if (!hasAccounts || (!freeTokens && !hasMembers)) {
    return { isLoading: false, status: 'addAccount', setFreeTokens }
  }

  if (!hasMembers && freeTokens !== 'redeemed') {
    return { isLoading: false, status: 'getFreeTokens', setFreeTokens }
  }

  if (!hasMembers && freeTokens === 'redeemed') {
    return { isLoading: false, status: 'createMembership' }
  }

  return { isLoading: false, status: 'finished' }
}
