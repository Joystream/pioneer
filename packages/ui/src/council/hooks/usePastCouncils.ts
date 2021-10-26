import { ElectedCouncilOrderByInput } from '@/common/api/queries'
import { useGetPastCouncilsQuery } from '@/council/queries'
import { asPastCouncil } from '@/council/types/PastCouncil'

export type PastCouncilsOrderKey = 'cycle' | 'termEnded'

interface UsePastCouncilsProps {
  page?: number
  orderKey: PastCouncilsOrderKey
  isDescending: boolean
}

const getOrderBy = (key: PastCouncilsOrderKey, isDescending: boolean) => {
  if (key === 'cycle') {
    return isDescending ? ElectedCouncilOrderByInput.ElectedAtBlockDesc : ElectedCouncilOrderByInput.ElectedAtBlockAsc
  }

  return isDescending ? ElectedCouncilOrderByInput.EndedAtBlockDesc : ElectedCouncilOrderByInput.EndedAtBlockAsc
}

export const usePastCouncils = ({ orderKey, isDescending }: UsePastCouncilsProps) => {
  const { loading, data } = useGetPastCouncilsQuery({
    variables: { orderBy: [getOrderBy(orderKey, isDescending)] },
  })

  return { isLoading: loading, councils: data?.electedCouncils.map(asPastCouncil) }
}
