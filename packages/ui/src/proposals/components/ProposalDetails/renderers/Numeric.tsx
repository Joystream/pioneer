import BN from 'bn.js'
import React from 'react'

import { NumericValueStat } from '@/common/components/statistics'

interface Props {
  label: string
  value: BN
}

export const Numeric = ({ label, value }: Props) => <NumericValueStat title={label} value={value} />
