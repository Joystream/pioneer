import { useApi } from '@/api/hooks/useApi'

export const useCouncilSize = () => {
  const { api } = useApi()
  return api?.consts.council.councilSize.toNumber()
}
