import React from 'react'

import { StatisticItem } from '@/common/components/statistics'
import { TooltipContentProp } from '@/common/components/Tooltip'
import { TextInlineBig } from '@/common/components/typography'

interface Props {
  label: string
  value: string | undefined
  tooltip?: TooltipContentProp
}

export const Text = ({ label, value, tooltip = {} }: Props) => (
  <StatisticItem title={label} {...tooltip}>
    <TextInlineBig bold value>
      {value ?? '-'}
    </TextInlineBig>
  </StatisticItem>
)
