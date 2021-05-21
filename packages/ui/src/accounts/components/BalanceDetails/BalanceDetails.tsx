import React from 'react'
import styled from 'styled-components'

import { BalanceDetailToggle } from '@/accounts/components/BalanceDetails/BalanceDetailToggle'
import { BalanceLockInfo } from '@/accounts/types'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Label, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { MemberRoleToggle } from '@/memberships/components/MemberProfile/MemberRoleToggle'

export interface BalanceDetailsProps {
  locks: BalanceLockInfo[]
  recoverables: any[]
}

export const BalanceDetails = ({ locks, recoverables }: BalanceDetailsProps) => {
  const displayLocks = () => {
    if (!locks.length) {
      return <TextMedium light>No locks found.</TextMedium>
    }

    return locks.map((lock) => <BalanceDetailToggle info={lock} />)
  }

  return (
    <BalanceDetailsWrap>
      <ContentWithTabs>
        <Label>Account locks</Label>
        {displayLocks()}
      </ContentWithTabs>
      <ContentWithTabs>
        <Label>Recoverable balance</Label>
      </ContentWithTabs>
    </BalanceDetailsWrap>
  )
}

const BalanceDetailsWrap = styled.div`
  padding: 16px;
  background: ${Colors.Black['100']};
`
