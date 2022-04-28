import { error as logError } from '@/common/logger'
import { useGetElectedCouncilQuery } from '@/council/queries'
import { asElectedCouncil } from '@/council/types'

export const useElectedCouncil = () => {
  const { loading, data, error } = useGetElectedCouncilQuery()

  if (error) {
    logError(error)
  }

  const rawCouncil = data?.electedCouncils[0]
  return { isLoading: loading, council: rawCouncil && asElectedCouncil(rawCouncil) }
}
