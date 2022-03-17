import { useGetContributorWithdrawalQuery } from '@/bounty/queries'

export const useCheckContributionWithdrawal = (contributionId: string) => {
  const { loading, data } = useGetContributorWithdrawalQuery({ variables: { id: contributionId } })

  return {
    isLoading: loading,
    hasWithdrawnContribution: !!data?.bountyFundingWithdrawalEventByUniqueInput?.id,
  }
}
