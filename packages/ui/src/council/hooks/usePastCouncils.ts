import { ElectedCouncilOrderByInput } from '@/common/api/queries'
import { useGetElectedCouncilsQuery } from '@/council/queries'
import { asCouncil } from '@/council/types'

export const usePastCouncils = () => {
  const { loading, data } = useGetElectedCouncilsQuery({
    variables: { where: { isResigned_eq: true }, order: ElectedCouncilOrderByInput.CreatedAtDesc },
  })

  return { isLoading: loading, councils: data?.electedCouncils.map(asCouncil) }
}
