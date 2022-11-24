import { useGetUserBountyTabsInformationQuery } from '@/bounty/queries'

export const useUserBountyTabsInformation = (memberIds: string[]) => {
  const { data, loading } = useGetUserBountyTabsInformationQuery({
    skip: !memberIds[0],
    variables: { memberIds: memberIds[0] && memberIds },
  })

  return {
    isLoading: loading,
    contributionsCount: data?.bountyContributionsConnection.totalCount,
    bountiesCount: data?.bountiesConnection.totalCount,
    entriesCount: data?.bountyEntriesConnection.totalCount,
  }
}
