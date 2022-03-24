import { useEffect } from 'react'

import { useGetBountyQuery } from '@/bounty/queries'
import { Bounty } from '@/bounty/types/Bounty'
import { useRefetch } from '@/common/hooks/useRefetch'
import { RefetchQuery } from '@/common/types/queries'

import { asBounty } from '../types/casts'

interface UseBounty {
  isLoading: boolean
  bounty: Bounty | undefined
  refetch: RefetchQuery
}

export const useBounty = (id: string): UseBounty => {
  const { data, loading, refetch } = useGetBountyQuery({ variables: { where: { id } } })

  const { setRefetch } = useRefetch()

  useEffect(() => {
    setRefetch('useBounty', refetch)
  }, [])

  const bounty = data?.bountyByUniqueInput ? asBounty(data.bountyByUniqueInput) : undefined

  return {
    isLoading: loading,
    bounty,
    refetch,
  }
}
