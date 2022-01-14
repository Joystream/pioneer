import React from 'react'

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
      <Statistics className={className}>
        {firstRow.map(({ content, ...statisticItemProps }, index) => (
          <StatisticItem key={`${statisticItemProps.title}${index}`} {...statisticItemProps}>
            {content}
          </StatisticItem>
        ))}
      </Statistics>
      <Statistics className={className}>
        {fundedDetails && <FundedRange maxRangeValue={15000} minRangeValue={13000} rangeValue={5000} />}
        {secondRow?.map(({ content, ...statisticItemProps }, index) => (
          <StatisticItem key={`${statisticItemProps.title}${index}`} {...statisticItemProps}>
            {content}
          </StatisticItem>
        )) ?? null}
      </Statistics>
    </>
  )
})
