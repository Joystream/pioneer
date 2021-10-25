import { useGetElectedCouncilQuery } from '@/council/queries'
import { asElectedCouncil } from '@/council/types'

export const useElectedCouncil = () => {
  const { loading, data } = useGetElectedCouncilQuery()
  const rawCouncil = data?.electedCouncils[0]

  return { isLoading: loading, council: rawCouncil && asElectedCouncil(rawCouncil) }
}
