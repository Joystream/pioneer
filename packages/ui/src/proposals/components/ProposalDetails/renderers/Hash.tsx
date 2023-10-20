import React from 'react'

import { CopyComponent } from '@/common/components/CopyComponent'
import { StatisticItem } from '@/common/components/statistics'
import { TooltipContentProp } from '@/common/components/Tooltip'
import { TextInlineBig } from '@/common/components/typography'
import { shortenAddress } from '@/common/model/formatters'

interface Props {
  label: string
  value: string | undefined
  tooltip?: TooltipContentProp
}

export const Hash = ({ label, value, tooltip = {} }: Props) => {
  const content = (
    <TextInlineBig bold value dark>
      {value ? shortenAddress(value) : '-'}
    </TextInlineBig>
  )
  return (
    <StatisticItem title={label} {...tooltip}>
      {value ? <CopyComponent altText={content} copyText={value} /> : content}
    </StatisticItem>
  )
}
