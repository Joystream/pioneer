import BN from 'bn.js'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { FundingDetails } from '@/bounty/components/BountyListItem/components/FundingDetails'
import { JudgmentDetails } from '@/bounty/components/BountyListItem/components/JudgmentDetails'
import { WithdrawalDetails } from '@/bounty/components/BountyListItem/components/WithdrawalDetails'
import { WorkingDetails } from '@/bounty/components/BountyListItem/components/WorkingDetails'
import { BountyPeriod, EntryMiniature, FundingType } from '@/bounty/types/Bounty'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface Props {
  type: BountyPeriod
  oracle?: Member
  cherry: BN
  fundingType: FundingType
  totalFunding: BN
  entrantStake: BN
  entries?: EntryMiniature[]
}

export const BountyDetails = ({ type, oracle, cherry, fundingType, totalFunding, entrantStake, entries }: Props) => {
  const content = useMemo(() => {
    switch (type) {
      case 'funding': {
        return <FundingDetails cherry={cherry} fundingType={fundingType} totalFunding={totalFunding} />
      }
      case 'working': {
        return <WorkingDetails totalFunding={totalFunding} entrantStake={entrantStake} entries={entries} />
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
        {oracle && <MemberInfo avatarSmall={true} size="s" memberSize="s" hideGroup onlyTop member={oracle} />}
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
