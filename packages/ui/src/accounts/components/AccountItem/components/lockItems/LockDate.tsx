import React from 'react'

import { Network } from '@/common/api/queries'
import { BlockTime } from '@/common/components/BlockTime'
import { TextMedium } from '@/common/components/typography'
import { asBlock } from '@/common/types'

interface LockDateProps {
  createdAt?: string
  inBlock?: number
  network?: Network
}

export const LockDate = React.memo(({ createdAt, inBlock, network }: LockDateProps) => {
  if (!createdAt || !inBlock || !network) {
    return <TextMedium value>Unknown</TextMedium>
  }

  const block = asBlock({ createdAt, inBlock, network })

  return <BlockTime block={block} layout="column" />
})
