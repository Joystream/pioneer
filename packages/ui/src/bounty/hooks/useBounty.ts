import { useGetBountyQuery } from '@/bounty/queries/__generated__/bounty.generated'
import { asBounty } from '@/bounty/types/casts'

export const useBounty = (id: string) => {
  const { data, loading } = useGetBountyQuery({
    variables: {
      id,
    },
  })

  const bounty = data?.bountyByUniqueInput ? asBounty(data.bountyByUniqueInput) : undefined

  return {
    isLoading: loading,
    bounty,
  }
}
