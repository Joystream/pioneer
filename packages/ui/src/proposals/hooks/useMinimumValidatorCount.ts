import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

export const useMinimumValidatorCount = () => {
  const { api } = useApi()
  return useFirstObservableValue(() => api?.query?.staking?.minimumValidatorCount(), [api?.isConnected])
}
