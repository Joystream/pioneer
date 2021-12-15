import React from 'react'
import styled from 'styled-components'

import { FundedRange } from '@/bounty/components/FundedRange'
import { BlockDurationStatistics, StatisticItem, Statistics } from '@/common/components/statistics'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface TileSectionProps {
  stage?: string
  labelTitle?: string
  tooltipText?: string
  durationTitle?: string
  value?: number
  bountyCreator?: string
  oracle?: string
  member: Member
  cherryLabel?: string
  cherryValue?: number
  cherryTooltipText?: string
  entrantLabel?: string
  entrantTooltipText?: string
  entrantValue?: number
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
    member,
    cherryLabel,
    cherryTooltipText,
    cherryValue,
    entrantLabel,
    entrantValue,
    entrantTooltipText,
  }: TileSectionProps) => {
    return (
      <>
        <Statistics>
          <StatisticItem title={labelTitle} tooltipText={tooltipText}>
            <TextHuge>{stage}</TextHuge>
          </StatisticItem>
          <BlockDurationStatistics title={durationTitle} value={value} />
          <StatisticItem title={bountyCreator}>
            <MemberInfo member={member} size="m" memberSize="m" hideGroup />
          </StatisticItem>
          <StatisticItem title={oracle}>
            <MemberInfo member={member} size="m" memberSize="m" hideGroup />
          </StatisticItem>
        </Statistics>
        <RowWrapper>
          <Statistics>
            <FundedRange
              maxRangeTitle="Maximal Range"
              maxRangeValue={15000}
              minRangeTitle="Minimal range"
              minRangeValue={13000}
              rangeTitle="Funded"
              rangeValue={5000}
            />
            <SimpleTile title={cherryLabel} tooltipText={cherryTooltipText}>
              <TokenValue value={cherryValue} size="l" />
            </SimpleTile>
            <SimpleTile title={entrantLabel} tooltipText={entrantTooltipText}>
              <TokenValue value={entrantValue} size="l" />
            </SimpleTile>
          </Statistics>
        </RowWrapper>
      </>
    )
  }
)

const RowWrapper = styled.div`
  margin-top: 20px;
`
const SimpleTile = styled(StatisticItem)`
  max-width: 210px;
`
