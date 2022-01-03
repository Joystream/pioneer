import { useGetBountyQuery } from '@/bounty/queries'
import { Bounty } from '@/bounty/types/Bounty'

import { asBounty } from '../types/casts'

interface UseBounty {
  isLoading: boolean
  bounty: Bounty | undefined
}

export const useBounty = (id: string): UseBounty => {
  const { data, loading } = useGetBountyQuery({ variables: { where: { id } } })

  const bounty = data?.bountyByUniqueInput ? asBounty(data.bountyByUniqueInput) : undefined

  return {
    isLoading: loading,
    bounty,
  }
}
