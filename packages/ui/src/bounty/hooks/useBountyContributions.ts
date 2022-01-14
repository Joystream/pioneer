import { useGetBountyContributorsQuery } from '@/bounty/queries'
import { BountyContributionsFiltersState } from '@/bounty/types/Bounty'
import { asContributors } from '@/bounty/types/casts'
import { BountyContributionOrderByInput } from '@/common/api/queries'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'

interface Props {
  order: SortOrder<BountyContributionOrderByInput>
  limit?: number
  filters?: BountyContributionsFiltersState
}

export const useBountyContributions = ({ order, limit, filters }: Props) => {
  const orderBy = toQueryOrderByInput<BountyContributionOrderByInput>(order)

  const { data, loading } = useGetBountyContributorsQuery({
    variables: {
      where: {
        contributor: {
          id_eq: filters?.contributorId,
        },
        bounty: {
          id_eq: filters?.bountyId,
        },
      },
      order: orderBy,
      limit,
    },
  })

  return {
    isLoading: loading,
    contributions: data?.bountyContributions ? asContributors(data.bountyContributions) : [],
  }
}
