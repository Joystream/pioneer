import { useApi } from '@/api/hooks/useApi'
import { asCouncilConstants, CouncilConstants } from '@/council/types/CouncilConstants'

export const useCouncilConstants = (): CouncilConstants | null => {
  const { api } = useApi()

  const councilConstants = api?.consts.council
  const referendumConstants = api?.consts.referendum

  return councilConstants && referendumConstants ? asCouncilConstants(councilConstants, referendumConstants) : null
}
