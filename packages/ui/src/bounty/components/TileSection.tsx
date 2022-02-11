import React from 'react'
import styled from 'styled-components'

import { FundedRange, FundedRangeProps } from '@/bounty/components/FundedRange'
import { StatisticItem, StatisticItemProps, Statistics } from '@/common/components/statistics'

export interface TileProps extends StatisticItemProps {
  content: React.ReactNode
}

export interface TileSectionProps {
  firstRow: TileProps[]
  secondRow?: TileProps[]
  fundedDetails?: FundedRangeProps
  className?: string
}

export const TileSection = React.memo(({ fundedDetails, secondRow, firstRow, className }: TileSectionProps) => {
  return (
    <>
      <StyledStatistics isWithSecondRow={!!secondRow} className={className}>
        {firstRow.map(({ content, ...statisticItemProps }, index) => (
          <StatisticItem key={`${statisticItemProps.title}${index}`} {...statisticItemProps}>
            {content}
          </StatisticItem>
        ))}
      </StyledStatistics>
      {(fundedDetails || secondRow) && (
        <Statistics className={className}>
          {fundedDetails && (
            <FundedRange
              maxRangeValue={fundedDetails.maxRangeValue}
              minRangeValue={fundedDetails.minRangeValue}
              rangeValue={fundedDetails.rangeValue}
            />
          )}
          {secondRow?.map(({ content, ...statisticItemProps }, index) => (
            <StatisticItem key={`${statisticItemProps.title}${index}`} {...statisticItemProps}>
              {content}
            </StatisticItem>
          ))}
        </Statistics>
      )}
    </>
  )
})

const StyledStatistics = styled(Statistics)<{ isWithSecondRow: boolean }>`
  margin-bottom: ${({ isWithSecondRow }) => isWithSecondRow && '18px'};
`
