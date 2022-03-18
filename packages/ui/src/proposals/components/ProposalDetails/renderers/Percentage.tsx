import React from 'react'

import { StatisticItem } from '@/common/components/statistics'
import { TextInlineBig } from '@/common/components/typography'

interface Props {
  label: string
  value: string
}

export const Percentage = ({ label, value }: Props) => (
  <StatisticItem title={label}>
    <TextInlineBig bold value>
      {value}%
    </TextInlineBig>
  </StatisticItem>
)
