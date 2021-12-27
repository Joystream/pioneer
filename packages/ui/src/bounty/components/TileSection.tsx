import React from 'react'
import styled from 'styled-components'

import { FundedRange, FundedRangeProps } from '@/bounty/components/FundedRange'
import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextHuge } from '@/common/components/typography'
import { Fonts } from '@/common/constants'

interface TileProps {
  title?: string
  content: React.ReactNode
  counter?: number
  tooltipText?: string
}

export interface TileSectionProps {
  firstRow: TileProps[]
  secondRow: TileProps[]
  fundedDetails?: FundedRangeProps
}

export const TileSection = React.memo(({ fundedDetails, secondRow, firstRow }: TileSectionProps) => {
  return (
    <>
      <Statistics>
        {firstRow.map((tile) => (
          <StatisticItem title={tile.title} counter={tile.counter} tooltipText={tile.tooltipText}>
            {tile.content}
          </StatisticItem>
        ))}
      </Statistics>
      <Statistics>
        {fundedDetails && <FundedRange maxRangeValue={15000} minRangeValue={13000} rangeValue={5000} />}
        {secondRow.map((tile) => (
          <StatisticItem title={tile.title} counter={tile.counter} tooltipText={tile.tooltipText}>
            {tile.content}
          </StatisticItem>
        ))}
      </Statistics>
    </>
  )
})

const StyledAvatarList = styled.div`
  transform: scale(1.5) translateX(45px) translateY(-5px);
`

const RowWrapper = styled.div`
  margin-top: 20px;
`

const StageTitle = styled(TextHuge)`
  font-family: ${Fonts.Grotesk};
`

// {member && (
//   <StatisticItem title={whitelistedLabel} counter={member.length}>
//     <StyledAvatarList>
//       <MemberStack members={member} max={5} />
//     </StyledAvatarList>
//   </StatisticItem>
// )}
// <StatisticItem title={labelTitle} tooltipText={tooltipText}>
//   <StageTitle>{stage}</StageTitle>
// </StatisticItem>
// <BlockDurationStatistics title={durationTitle} value={value} />
// <StatisticItem title={bountyCreator}>
//   <MemberInfo member={bountyMember} size="m" memberSize="m" hideGroup />
// </StatisticItem>
// <StatisticItem title={oracle}>
//   <MemberInfo member={oracleMember} size="m" memberSize="m" hideGroup />
// </StatisticItem>
