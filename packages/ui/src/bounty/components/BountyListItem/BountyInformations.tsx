import { Identicon } from '@polkadot/react-identicon'
import React from 'react'
import styled from 'styled-components'

import { BountyPeriod } from '@/bounty/types/Bounty'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { DurationStatistics } from '@/common/components/statistics'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { BorderRad } from '@/common/constants'

export const BountyInformations = ({ type }: { type: BountyPeriod }) => {
  return (
    <Wrapper>
      <TitleContainer>
        <TextMedium bold>
          Gabriel
          <Avatar size={40} theme={'beachball'} />
        </TextMedium>
        <TextHuge bold>The blood alcohol</TextHuge>
      </TitleContainer>
      <BadgeDurationContainer>
        <BadgesRow space={8}>
          <BadgeStatus inverted>GOVERNANCE BUDGET</BadgeStatus>
          <BadgeStatus inverted>ELECTION #6</BadgeStatus>
        </BadgesRow>
        {type !== 'expired' && <DurationStatistics size="s" value={new Date().toISOString()} title="Time" />}
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
const Avatar = styled(Identicon)`
  position: absolute;
  top: -10px;
  left: -45px;
  border-radius: ${BorderRad.full};
  background-color: darkred;
`
