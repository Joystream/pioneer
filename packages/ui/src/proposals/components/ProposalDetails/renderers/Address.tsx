import React from 'react'

import { CopyButton } from '@/common/components/buttons'
import { NumericValue, StatiscticSpaceRow, StatisticItem } from '@/common/components/statistics'
import { shortenAddress } from '@/common/model/formatters'

interface Props {
  label: string
  value: string
}

export const Address = ({ label, value }: Props) => (
  <StatisticItem title={label}>
    <StatiscticSpaceRow>
      <NumericValue>{shortenAddress(value, 12)}</NumericValue>
      <CopyButton textToCopy={value} />
    </StatiscticSpaceRow>
  </StatisticItem>
)
