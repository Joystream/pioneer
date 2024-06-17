import React from 'react'

import { CopyButton } from '@/common/components/buttons'
import { NumericValue, StatiscticSpaceRow, StatisticItem } from '@/common/components/statistics'
import { TextBig } from '@/common/components/typography'
import { shortenAddress } from '@/common/model/formatters'

interface Props {
  label: string
  value?: string
}

export const Address = ({ label, value }: Props) => (
  <StatisticItem title={label}>
    {value ? (
      <StatiscticSpaceRow>
        <NumericValue>{shortenAddress(value, 12)}</NumericValue>
        <CopyButton textToCopy={value} />
      </StatiscticSpaceRow>
    ) : (
      <TextBig>None</TextBig>
    )}
  </StatisticItem>
)
