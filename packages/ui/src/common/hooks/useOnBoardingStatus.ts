import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/common/hooks/useApi'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useObservable } from '@/common/hooks/useObservable'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export type OnBoardingStatus = 'installPlugin' | 'addAccount' | 'getFreeTokens' | 'createMembership' | 'finished'

interface UseOnBoardingStatus {
  isLoading: boolean
  status?: OnBoardingStatus
  setFreeTokensAccount?: any
}

export const useOnBoardingStatus = (): UseOnBoardingStatus => {
  const { isConnected } = useApi()
  const { isLoading: isLoadingAccounts, error: accountsError, hasAccounts } = useMyAccounts()
  const { isLoading: isLoadingMembers, hasMembers } = useMyMemberships()
  const [freeTokensAccount, setFreeTokensAccount] = useLocalStorage<string>('free-tokens-account')

  if (!isConnected || isLoadingAccounts || isLoadingMembers) {
    return { isLoading: true }
  }

  if (accountsError === 'EXTENSION') {
    return { isLoading: false, status: 'installPlugin' }
  }

  if (!hasAccounts || (!freeTokensAccount && !hasMembers)) {
    return { isLoading: false, status: 'addAccount', setFreeTokensAccount }
  }

  if (!hasMembers) {
    return { isLoading: false, status: 'createMembership' }
  }

  return { isLoading: false, status: 'finished' }
}
