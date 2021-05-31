import { startOfWeek } from 'date-fns'

import { useAccounts } from '@/accounts/hooks/useAccounts'

import { useGetRewardsQuery } from '../queries'

interface UseMyEarnings {
  isLoading: boolean
  earnings: {
    today: number
    month: number
  }
}

export function useMyEarnings(): UseMyEarnings {
  const { allAccounts } = useAccounts()

  const where = {
    rewardAccount_in: allAccounts.map((account) => account.address),
    createdAt_gte: startOfWeek(Date.now(), { weekStartsOn: 1 }),
  }
  const { loading, data } = useGetRewardsQuery({ variables: { where } })

  console.log('Rewards query response', loading, data, where)
  return { isLoading: loading, earnings: { today: 0, month: 0 } }
}
