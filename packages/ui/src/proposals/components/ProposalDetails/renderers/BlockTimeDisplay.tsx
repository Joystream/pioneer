import React, { useMemo } from 'react'

import { BlockTime } from '@/common/components/BlockTime'
import { StatisticItem } from '@/common/components/statistics'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { Block } from '@/common/types'
import { ProposalStatusUpdates } from '@/proposals/types'

interface Props {
  label: string
  value: { exactExecutionBlock: number; createdAt: string; updates: ProposalStatusUpdates[] }
}
export const BlockTimeDisplay = ({ label, value }: Props) => {
  const { exactExecutionBlock, createdAt, updates } = value
  
  const getBlockDetails = useMemo(() => {
    if(updates.length > 0 && createdAt){
      const createdAtTimestamp = new Date(createdAt).getTime()
      const timestamp = createdAtTimestamp + ((exactExecutionBlock - updates[0].inBlock.number) * MILLISECONDS_PER_BLOCK)

      return {
        number: exactExecutionBlock,
        timestamp: timestamp,
      } as unknown as Block
    }
    return { } as unknown as Block
  }, [value])
  return (
    <StatisticItem title={label}>
      <BlockTime block={getBlockDetails} />
    </StatisticItem>
  )
}
