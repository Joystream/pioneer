import React from 'react'

import { BlockTime } from '@/common/components/BlockTime'
import { TextMedium } from '@/common/components/typography'
import { Block } from '@/common/types'

interface LockDateProps {
  createdInEvent?: Block
}

export const LockDate = React.memo(({ createdInEvent }: LockDateProps) => {
  if (!createdInEvent) {
    return <TextMedium value>Unknown</TextMedium>
  }

  return <BlockTime block={createdInEvent} layout="column" lessInfo />
})
