import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const useMinimumValidatorCount = () => {
  const { api } = useApi()
  return useObservable(api?.query?.staking?.minimumValidatorCount(), [])
}
