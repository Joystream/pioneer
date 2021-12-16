import React, { useMemo } from 'react'
import styled from 'styled-components'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { FundingDetails } from '@/bounty/components/BountyListItem/components/FundingDetails'
import { JudgmentDetails } from '@/bounty/components/BountyListItem/components/JudgmentDetails'
import { WithdrawalDetails } from '@/bounty/components/BountyListItem/components/WithdrawalDetails'
import { WorkingDetails } from '@/bounty/components/BountyListItem/components/WorkingDetails'
import { BountyPeriod } from '@/bounty/types/Bounty'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'

interface Props {
  type: BountyPeriod
}

export const BountyDetails = ({ type }: Props) => {
  const { isLoading, member } = useMember('0')

  const content = useMemo(() => {
    switch (type) {
      case 'funding': {
        return <FundingDetails />
      }
      case 'working': {
        return <WorkingDetails />
      }
      case 'judgement': {
        return <JudgmentDetails />
      }
      case 'withdrawal': {
        return <WithdrawalDetails />
      }
      case 'expired': {
        return <WithdrawalDetails />
      }
      default:
        return null
    }
  }, [type])

  return (
    <Wrapper>
      {content}
      <DetailBox title="Oracle">
        {!isLoading && member && (
          <MemberInfo avatarSmall={true} size="s" memberSize="s" hideGroup onlyTop member={member} />
        )}
      </DetailBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 4;
  width: 100%;
  display: flex;
  justify-content: space-between;
`
