import { useGetBountyQuery } from '@/bounty/queries'
import { Bounty } from '@/bounty/types/Bounty'
import { RefetchQuery } from '@/common/types/queries'

import { asBounty } from '../types/casts'

interface UseBounty {
  isLoading: boolean
  bounty: Bounty | undefined
  refetch: RefetchQuery
}

export const useBounty = (id: string): UseBounty => {
  const { data, loading, refetch } = useGetBountyQuery({ variables: { where: { id } } })

  const bounty = data?.bountyByUniqueInput ? asBounty(data.bountyByUniqueInput) : undefined

  return {
    isLoading: loading,
    bounty,
    refetch,
  }
}
