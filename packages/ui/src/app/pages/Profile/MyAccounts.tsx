import React from 'react'

import { Accounts } from '@/accounts/components/Accounts'
import { ClaimVestingButton } from '@/accounts/components/ClaimVestingButton'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '@/common/components/statistics'

import { MyProfileTabs } from './components/MyProfileTabs'

export const MyAccounts = () => {
  const { total, transferable, locked, recoverable, vestingTotal, vestedClaimable, vestingLocked } =
    useMyTotalBalances()
  const { hasAccounts, isLoading } = useMyAccounts()
  const shouldHideStatistics = !hasAccounts && !isLoading

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeaderWrapper>
            <PageTitle>My Profile</PageTitle>
            <MyProfileTabs />
          </PageHeaderWrapper>
          {!shouldHideStatistics && (
            <Statistics>
              <TokenValueStat
                title="Total balance"
                tooltipText="Total balance from all connected accounts. This includes transferable and locked balance."
                value={total}
              />
              <TokenValueStat
                title="Total transferable balance"
                tooltipText="Total Balance less locked balance. Transferable balance can be used for signing transactions on the network."
                value={transferable}
              />
              <TokenValueStat
                title="Total locked balance"
                tooltipText="Staking, or bonding, is the act of locking up funds under some terms so that they are not transferable and otherwise not entirely usable as they otherwise would be. The terms, referred to as unstaking terms describe the circumstances under which the funds may begin to cease being staked. The way staking is implemented is with the use of account."
                tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/accounts-and-staking#locks"
                value={locked}
              />
              <TokenValueStat
                title="Total recoverable balance"
                tooltipText="Recoverable balance encapsulates all tokens that can be recovered, following the termination of the process where they were previously staked. Example: Vote has been casted for a candidate in council elections. That candidate lost the election and now the stake that was put behind the voting power for such candidate can be recovered, meaning locked balance will be reduced by such amount, while transferable balance will increase for the amount of staking lock."
                value={recoverable}
              />
              {vestingTotal.gtn(0) && (
                <TokenValueStat title="Total initial vesting" tooltipText="Lorem ipsum..." value={vestingTotal} />
              )}
              {vestingTotal.gtn(0) && (
                <TokenValueStat title="Total Locked in Vesting" tooltipText="Lorem ipsum..." value={vestingLocked} />
              )}
              {vestingTotal.gtn(0) && (
                <TokenValueStat
                  title="Total Vested Claimable"
                  tooltipText="Vested tokens are locked for a period of time. This is the amount that has been unlocked already."
                  value={vestedClaimable}
                  inline
                >
                  {vestedClaimable.gtn(0) && <ClaimVestingButton />}
                </TokenValueStat>
              )}
            </Statistics>
          )}
        </RowGapBlock>
      }
      main={<Accounts />}
    />
  )
}
