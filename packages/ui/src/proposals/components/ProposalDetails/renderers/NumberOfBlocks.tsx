import BN from 'bn.js'
import React from 'react'

import { StatisticItem } from '@/common/components/statistics'
import { TextInlineBig } from '@/common/components/typography'
import { formatTokenValue } from '@/common/model/formatters'

interface Props {
  label: string
  value: BN
}

export const NumberOfBlocks = ({ label, value }: Props) => (
  <StatisticItem title={label}>
    <TextInlineBig bold value>
      {formatTokenValue(value)} blocks
    </TextInlineBig>
  </StatisticItem>
)
