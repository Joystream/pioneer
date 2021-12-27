import { useGetBountyQuery } from '@/bounty/queries/__generated__/bounty.generated'
import { asBounty } from '@/bounty/types/Bounty'

export const useBounty = (id: string) => {
  const { data, loading } = useGetBountyQuery({
    variables: {
      where: {
        id: id,
      },
    },
  })

  const bounty = data?.bountyByUniqueInput ? asBounty(data.bountyByUniqueInput) : undefined

  return {
    isLoading: loading,
    bounty,
  }
}
