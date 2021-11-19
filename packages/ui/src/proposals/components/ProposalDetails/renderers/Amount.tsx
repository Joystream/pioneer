import BN from 'bn.js'
import React from 'react'

import { TokenValueStat } from '@/common/components/statistics'

interface Props {
  label: string
  value: BN
}

export const Amount = ({ label, value }: Props) => <TokenValueStat title={label} value={value} />
