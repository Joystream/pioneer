import React, { useEffect } from 'react'
import styled from 'styled-components'

import { Accounts } from '@/accounts/components/Accounts'
import { ClaimVestingButton } from '@/accounts/components/ClaimVestingButton'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { useTotalVesting } from '@/accounts/hooks/useTotalVesting'
import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { TooltipText } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { MyProfileTabs } from './components/MyProfileTabs'

// preselect an acc on clim modal
export const MyAccounts = () => {
  const { wallet } = useMyAccounts()
  const { active } = useMyMemberships()
  const { api, isConnected } = useApi()
  const { total, transferable, locked, recoverable } = useMyTotalBalances()
  const { totalVestedClaimable, totalVestingLocked, totalVestedClaimed } = useTotalVesting()

  useEffect(() => {
    if (active && api) {
      // api.tx.vesting
      //   .vestedTransfer(
      //     '5ETxSDiEkVp3Ayg5ew5aQN7ZYgNr4vCdmFZAGSnDRgQPXyQC',
      //     createType('PalletVestingVestingInfo', {
      //       locked: new BN(100000_000_000_000),
      //       perBlock: new BN(100000000000),
      //       startingBlock: new BN(100_170),
      //     })
      //   )
      //   .signAndSend(active.controllerAccount, { signer: wallet?.signer })
      // api.tx.vesting.vest().signAndSend(active.controllerAccount, { signer: wallet?.signer })
    }
  }, [isConnected])

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeaderWrapper>
            <PageTitle>My Profile</PageTitle>
            <ClaimVestingButton />
            <MyProfileTabs />
          </PageHeaderWrapper>
          <StyledStatistics>
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
              tooltipText={
                <>
                  <TooltipText>
                    Staking, or bonding, is the act of locking up funds under some terms so that they are not
                    transferable and otherwise not entirely usable as they otherwise would be. The terms, referred to as
                    unstaking terms describe the circumstances under which the funds may begin to cease being staked.
                    The way staking is implemented is with the use of account{' '}
                    <StyledLink href="https://joystream.gitbook.io/joystream-handbook/key-concepts/staking#locks">
                      locks
                    </StyledLink>
                  </TooltipText>{' '}
                </>
              }
              value={locked}
            />
            <TokenValueStat title="Total recoverable" tooltipText="Lorem ipsum..." value={recoverable} />
            <TokenValueStat title="Total initial vesting" tooltipText="Lorem ipsum..." value={totalVestedClaimed} />
            <TokenValueStat title="Total Locked in Vesting" tooltipText="Lorem ipsum..." value={totalVestingLocked} />
            <TokenValueStat title="Total Vested Claimable" tooltipText="Lorem ipsum..." value={totalVestedClaimable} />
          </StyledStatistics>
        </RowGapBlock>
      }
      main={<Accounts />}
    />
  )
}

export const StyledLink = styled.a`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.Black[400]};
  text-decoration: underline;
`

const StyledStatistics = styled(Statistics)`
  > * {
    flex-basis: 220px;
  }
`
