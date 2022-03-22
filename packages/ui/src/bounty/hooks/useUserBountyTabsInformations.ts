import { useGetUserBountyTabsInformationsQuery } from '@/bounty/queries'

export const useUserBountyTabsInformations = (memberIds: string[]) => {
  const { data, loading } = useGetUserBountyTabsInformationsQuery({
    variables: { memberIds: memberIds[0] && memberIds },
  })

  return {
    isLoading: loading,
    contributionsCount: data?.bountyContributionsConnection.totalCount,
    bountiesCount: data?.bountiesConnection.totalCount,
    entriesCount: data?.bountyEntriesConnection.totalCount,
  }
}
