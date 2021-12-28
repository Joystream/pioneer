import React from 'react'
import styled from 'styled-components'

import { BountyPeriod } from '@/bounty/types/Bounty'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { DurationStatistics } from '@/common/components/statistics'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { MemberInfoAvatar } from '@/memberships/components/Avatar'
import { Member } from '@/memberships/types'

interface Props {
  period: BountyPeriod
  title: string
  creator?: Member
  date?: Date
}

export const BountyInformations = ({ period, creator, date, title }: Props) => {
  return (
    <Wrapper>
      <TitleContainer>
        {creator && (
          <TextMedium bold>
            {creator.handle}
            <AvatarWrapper>
              <MemberInfoAvatar member={creator} />
            </AvatarWrapper>
          </TextMedium>
        )}
        {/* TODO: convert to link */}
        <TextHuge bold>{title}</TextHuge>
      </TitleContainer>
      <BadgeDurationContainer>
        <BadgesRow space={8}>
          {/* TODO: add tags to schema */}
          <BadgeStatus inverted>GOVERNANCE BUDGET</BadgeStatus>
          <BadgeStatus inverted>ELECTION #6</BadgeStatus>
        </BadgesRow>
        {period !== 'expired' && date && <DurationStatistics size="s" value={date.toISOString()} title="Time left" />}
      </BadgeDurationContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 6;
  width: 100%;
  display: flex;
`

const TitleContainer = styled.div`
  flex: 1;
  row-gap: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0;

  > *:first-child {
    position: relative;
  }
`

const BadgeDurationContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  column-gap: 16px;

  > div:first-child {
    margin-top: 27px;
  }

  > div:nth-child(2) {
    margin-top: 17px;
    max-width: 160px;
  }
`
const AvatarWrapper = styled.div`
  position: absolute;
  top: -10px;
  left: -45px;
`
