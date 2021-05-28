import { useGetRewardsQuery } from '../queries'

interface UseMyEarnings {
  isLoading: boolean
  earnings: {
    today: number
    month: number
  }
}

export function useMyEarnings(): UseMyEarnings {
  const { loading, data } = useGetRewardsQuery({ variables: {} })

  console.log('Rewards query response', loading, data)
  return { isLoading: loading, earnings: { today: 0, month: 0 } }
}
