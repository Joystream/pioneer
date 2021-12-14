import React, { useMemo } from 'react'

import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { BadgesRow } from '@/common/components/BadgeStatus/BadgesRow'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'

interface Props {
  type: 'funding' | 'withdrawal' | 'judgment' | 'working' | 'expired'
}

export const BountyPreviewHeader = ({ type }: Props) => {
  const buttons = useMemo(() => {
    switch (type) {
      case 'funding': {
        return <ButtonPrimary size="large">Contribute</ButtonPrimary>
      }
      case 'working': {
        return (
          <>
            <ButtonPrimary size="large">Announce Entry</ButtonPrimary>
          </>
        )
      }
      case 'judgment': {
        return <ButtonGhost size="large">Notify me about changes</ButtonGhost>
      }
      case 'withdrawal': {
        return (
          <>
            <ButtonGhost size="large">Notify me about changes</ButtonGhost>
            <ButtonPrimary size="large">Claim Reward</ButtonPrimary>
          </>
        )
      }
      case 'expired': {
        return (
          <>
            <ButtonPrimary size="large">Cancel Bounty</ButtonPrimary>
          </>
        )
      }
      default: {
        return null
      }
    }
  }, [type])

  return (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PreviousPage>
          <PageTitle>Long title</PageTitle>
        </PreviousPage>
        <ButtonsGroup>{buttons}</ButtonsGroup>
      </PageHeaderRow>
      <PageHeaderRow>
        <BadgesRow space={8}>
          <BadgeStatus inverted>GOVERNANCE BUDGET</BadgeStatus>
          <BadgeStatus inverted>BOUNTIES</BadgeStatus>
        </BadgesRow>
      </PageHeaderRow>
    </PageHeaderWrapper>
  )
}
