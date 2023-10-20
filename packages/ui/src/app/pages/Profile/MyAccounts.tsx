import React from 'react'

import { Accounts } from '@/accounts/components/Accounts'
import { ClaimVestingButton } from '@/accounts/components/ClaimVestingButton'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'

import { BannerSection } from './components/BannerSection'
import { MyProfileTabs } from './components/MyProfileTabs'

const hints = {
  total: {
    title: 'Total balance',
    tooltipText: 'Total balance from all connected accounts. This includes transferable and locked balance.',
  },
  transferable: {
    title: 'Total transferable balance',
    tooltipText:
      'Total Balance less locked balance. Transferable balance can be used for signing transactions on the network.',
  },
  locked: {
    title: 'Total locked balance',
    tooltipLinkURL: 'https://joystream.gitbook.io/joystream-handbook/key-concepts/staking#locks',
    tooltipText:
      'Staking, or bonding, is the act of locking up funds under some terms so that they are not transferable and otherwise not entirely usable as they otherwise would be. The terms, referred to as unstaking terms describe the circumstances under which the funds may begin to cease being staked. The way staking is implemented is with the use of account.',
  },
  recoverable: {
    title: 'Total recoverable balance',
    tooltipText:
      'Recoverable balance encapsulates all tokens that can be recovered, following the termination of the process where they were previously staked. Example: Vote has been casted for a candidate in council elections. That candidate lost the election and now the stake that was put behind the voting power for such candidate can be recovered, meaning locked balance will be reduced by such amount, while transferable balance will increase for the amount of staking lock.',
  },
  vestingTotal: {
    title: 'Total initial vesting',
    tooltipText:
      'Total Initial vesting is the amount of tokens that are allocated to this account in the Genesis block, or via vesting transfer. From the very beginning this amount is fully locked, and some gets unlocked in accordance to vesting schedule. This is a sum of locked and all historically unlocked funds.',
  },
  vestingLocked: {
    title: 'Total Locked in Vesting',
    tooltipText:
      'Total locked in vesting encapsulates all of the tokens from genesis allocation and vesting transfers that are subject to the vesting schedules. This amount gets reduced with every block in accordance to multiple combined vesting schedules each corresponding to a related vesting transfer which can be with its own terms.',
  },
  claimable: {
    title: 'Total Vested Claimable',
    tooltipText: 'Vested tokens are locked for a period of time. This is the amount that has been unlocked already.',
  },
}

export const MyAccounts = () => {
  const { total, transferable, locked, recoverable, vestingTotal, vestedClaimable, vestingLocked } =
    useMyTotalBalances()
  const { hasAccounts, isLoading } = useMyAccounts()
  const [shouldDismissBanner, setShouldDismissBanner] = useLocalStorage<boolean>('buy-joy-banner') ?? false
  const shouldHideStatistics = !hasAccounts && !isLoading

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeaderWrapper>
            <PageTitle>My Profile</PageTitle>
            <MyProfileTabs />
          </PageHeaderWrapper>
          {!shouldDismissBanner && <BannerSection setShouldDismissBanner={setShouldDismissBanner} />}
          {!shouldHideStatistics && (
            <Statistics>
              <TokenValueStat {...hints.total} value={total} />
              <TokenValueStat {...hints.transferable} value={transferable} />
              <TokenValueStat {...hints.locked} value={locked} />
              <TokenValueStat {...hints.recoverable} value={recoverable} />
              {vestingTotal.gtn(0) && <TokenValueStat {...hints.vestingTotal} value={vestingTotal} />}
              {vestingTotal.gtn(0) && <TokenValueStat {...hints.vestingLocked} value={vestingLocked} />}
              {vestingTotal.gtn(0) && (
                <TokenValueStat {...hints.claimable} value={vestedClaimable} inline>
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
