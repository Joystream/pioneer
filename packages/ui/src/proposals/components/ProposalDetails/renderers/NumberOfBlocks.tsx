import BN from 'bn.js'
import React from 'react'

import { BlockDurationStatistics } from '@/common/components/statistics'

interface Props {
  label: string
  value: BN
}

export const NumberOfBlocks = ({ label, value }: Props) => <BlockDurationStatistics title={label} value={value} />
