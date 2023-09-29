import React from 'react'

import { BlockTime } from '@/common/components/BlockTime'
import { StatisticItem } from '@/common/components/statistics'
import { Block } from '@/common/types'

interface Props {
  label: string
  value: Block
}
export const BlockTimeDisplay = ({ label, value }: Props) => {
  return (
    <StatisticItem title={label}>
      <BlockTime block={value} />
    </StatisticItem>
  )
}
