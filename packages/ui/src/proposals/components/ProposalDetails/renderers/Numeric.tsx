import BN from 'bn.js'
import React from 'react'

import { NumericValueStat } from '@/common/components/statistics'
import { TextSmall } from '@/common/components/typography'

interface Props {
  label: string
  value?: BN | number
  units?: string
}

export const Numeric = ({ label, value, units }: Props) => (
  <NumericValueStat title={label} value={value}>
    {units && (
      <TextSmall as="span" lighter>
        {' '}
        {units}
      </TextSmall>
    )}
  </NumericValueStat>
)
