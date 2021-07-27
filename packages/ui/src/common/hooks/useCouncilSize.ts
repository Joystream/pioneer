import { useApi } from './useApi'

export const useCouncilSize = () => {
  const { api } = useApi()
  return api?.consts.council.councilSize.toNumber()
}
