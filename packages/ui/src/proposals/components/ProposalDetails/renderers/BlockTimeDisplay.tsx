/* eslint-disable no-console */
import React, { useMemo } from 'react'

import { BlockTime } from '@/common/components/BlockTime'
import { StatisticItem } from '@/common/components/statistics'
import { SECONDS_PER_BLOCK } from '@/common/constants'
import { Block } from '@/common/types'

interface Props {
  label: string
  value: number
}
export const BlockTimeDisplay = ({ label, value }: Props) => {
  const firstBlockDate = 1670710002
  const blockInSeconds = value * SECONDS_PER_BLOCK
  const milliseconds = (firstBlockDate + blockInSeconds) * 1000
  console.log('Milli seconds ', milliseconds)
  const timestamp = new Date(milliseconds).toISOString()
  const getBlockDetails = useMemo(() => {
    return {
      number: value,
      timestamp: timestamp,
    } as Block
  }, [value])
  return (
    <StatisticItem title={label}>
      <BlockTime block={getBlockDetails} />
    </StatisticItem>
  )
}
