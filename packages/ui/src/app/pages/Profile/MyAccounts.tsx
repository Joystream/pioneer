import React from 'react'
import styled from 'styled-components'

import { Accounts } from '@/accounts/components/Accounts'
import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { TooltipText } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'

import { MyProfileTabs } from './components/MyProfileTabs'

export const MyAccounts = () => {
  const { total, transferable, locked, recoverable } = useMyTotalBalances()

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeaderWrapper>
            <PageTitle>My Profile</PageTitle>
            <MyProfileTabs />
          </PageHeaderWrapper>
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
          </Statistics>
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
