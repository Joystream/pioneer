import { useGetElectedCouncilsQuery } from '@/council/queries'
import { asCouncil } from '@/council/types'

export const useElectedCouncil = () => {
  const { loading, data } = useGetElectedCouncilsQuery({ variables: { where: { endedAtBlock_eq: null } } })
  const rawCouncil = data?.electedCouncils[0]
  return { isLoading: loading, council: rawCouncil && asCouncil(rawCouncil) }
}
