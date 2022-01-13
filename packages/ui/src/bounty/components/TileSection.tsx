import React from 'react'

import { FundedRange, FundedRangeProps } from '@/bounty/components/FundedRange'
import { StatisticItem, StatisticItemProps, Statistics } from '@/common/components/statistics'

interface TileProps extends StatisticItemProps {
  content: React.ReactNode
}

export interface TileSectionProps {
  firstRow: TileProps[]
  secondRow?: TileProps[]
  fundedDetails?: FundedRangeProps
}

export const TileSection = React.memo(({ fundedDetails, secondRow, firstRow }: TileSectionProps) => {
  return (
    <>
      <Statistics>
        {firstRow.map(({ content, ...statisticItemProps }, index) => (
          <StatisticItem key={`${statisticItemProps.title}${index}`} {...statisticItemProps}>
            {content}
          </StatisticItem>
        ))}
      </Statistics>
      <Statistics>
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
