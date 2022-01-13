import { useGetContributionsQuery } from '@/bounty/queries'
import { BountyContributionWhereInput } from '@/common/api/queries'

import { asContribution } from '../types/casts'

interface useBountyContributionsProps {
  createdAfter: Date
  limit?: number
}

export const useBountyContributions = ({ createdAfter, limit = 10 }: useBountyContributionsProps) => {
  const where: BountyContributionWhereInput = { createdAt_gt: createdAfter.toISOString() }
  const variables = { where, limit }

  const { loading, data } = useGetContributionsQuery({ variables })

  return {
    isLoading: loading,
    contributions: data?.bountyContributions.map(asContribution) ?? [],
  }
}
