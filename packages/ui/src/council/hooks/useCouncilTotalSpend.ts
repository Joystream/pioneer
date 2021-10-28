import { useCouncilBlockRange } from '@/council/hooks/useCouncilBlockRange'
import { useGetPastCouncilBudgetSpendingQuery } from '@/council/queries'
import { getTotalSpent } from '@/council/types/PastCouncil'

export const useCouncilTotalSpend = (id: string) => {
  const { fromBlock, toBlock, loadingRange } = useCouncilBlockRange(id)

  const { loading, data } = useGetPastCouncilBudgetSpendingQuery({
    variables: {
      fromBlock: fromBlock,
      toBlock: toBlock,
    },
  })

  const totalSpent = getTotalSpent(data?.budgetSpendingEvents ?? [])

  return { isLoading: loading || loadingRange, totalSpent }
}
