import React from 'react'
import styled from 'styled-components'

import { FundedRange } from '@/bounty/components/FundedRange'
import { BlockDurationStatistics, StatisticItem, Statistics } from '@/common/components/statistics'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { Fonts } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'

export interface TileSectionProps {
  stage?: string
  labelTitle?: string
  tooltipText?: string
  durationTitle?: string
  value?: number
  bountyCreator?: string
  oracle?: string
  oracleMember: Member
  bountyMember: Member
  member: Member[]
  winnerMember: Member[]
  cherryLabel?: string
  cherryValue?: number
  cherryTooltipText?: string
  entrantLabel?: string
  entrantTooltipText?: string
  entrantValue?: number
  isProgressBarVisible?: boolean
  whitelistedLabel?: string
  counter?: number
  firstTileLabel?: string
  firstTooltipText?: string
  firstValue?: number
  endLabel?: string
  endTooltipText?: string
  endValue?: number
  winnersAvailable?: boolean
}

export const TileSection = React.memo(
  ({
    stage,
    labelTitle,
    tooltipText,
    durationTitle,
    value,
    bountyCreator,
    oracle,
    oracleMember,
    bountyMember,
    cherryLabel,
    cherryTooltipText,
    cherryValue,
    firstTileLabel,
    firstTooltipText,
    firstValue,
    whitelistedLabel,
    member,
    isProgressBarVisible,
    endLabel,
    endTooltipText,
    endValue,
    winnersAvailable,
    winnerMember,
  }: TileSectionProps) => {
    return (
      <>
        <Statistics>
          {member && (
            <StatisticItem title={whitelistedLabel} counter={member.length}>
              <StyledAvatarList>
                <MemberStack members={member} max={5} />
              </StyledAvatarList>
            </StatisticItem>
          )}
          <StatisticItem title={labelTitle} tooltipText={tooltipText}>
            <StageTitle>{stage}</StageTitle>
          </StatisticItem>
          <BlockDurationStatistics title={durationTitle} value={value} />
          <StatisticItem title={bountyCreator}>
            <MemberInfo member={bountyMember} size="m" memberSize="m" hideGroup />
          </StatisticItem>
          <StatisticItem title={oracle}>
            <MemberInfo member={oracleMember} size="m" memberSize="m" hideGroup />
          </StatisticItem>
        </Statistics>
        <RowWrapper>
          <Statistics>
            {isProgressBarVisible ? (
              <FundedRange
                maxRangeTitle="Maximal Range"
                maxRangeValue={15000}
                minRangeTitle="Minimal range"
                minRangeValue={13000}
                rangeTitle="Funded"
                rangeValue={5000}
              />
            ) : (
              <StatisticItem title={firstTileLabel} tooltipText={firstTooltipText}>
                <TokenValue value={firstValue} size="l" />
              </StatisticItem>
            )}
            <StatisticItem title={cherryLabel} tooltipText={cherryTooltipText}>
              <TokenValue value={cherryValue} size="l" />
            </StatisticItem>
            <StatisticItem title={endLabel} tooltipText={endTooltipText}>
              {winnersAvailable ? (
                <MemberStack members={winnerMember} max={5} />
              ) : (
                <TokenValue value={endValue} size="l" />
              )}
            </StatisticItem>
          </Statistics>
        </RowWrapper>
      </>
    )
  }
)

const StyledAvatarList = styled.div`
  transform: scale(1.5) translateX(45px) translateY(-5px);
`

const RowWrapper = styled.div`
  margin-top: 20px;
`

const StageTitle = styled(TextHuge)`
  font-family: ${Fonts.Grotesk};
`
