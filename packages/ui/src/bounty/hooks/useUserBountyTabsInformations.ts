import { useGetUserBountyTabsInformationsQuery } from '@/bounty/queries'

export const useUserBountyTabsInformations = (memberId: string) => {
  const { data, loading } = useGetUserBountyTabsInformationsQuery({
    variables: {
      memberId,
    },
  })

  return {
    isLoading: loading,
    contributionsCount: data?.bountyContributionsConnection.totalCount,
    bountiesCount: data?.bountiesConnection.totalCount,
    entriesCount: data?.bountyEntriesConnection.totalCount,
  }
}
