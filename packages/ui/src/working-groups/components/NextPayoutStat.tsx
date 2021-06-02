import React, { useMemo } from 'react'

import { TokenValueStat } from '../../common/components/statistics'
import { useCurrentBlockNumber } from '../../common/hooks/useCurrentBlockNumber'
import { getNextPayout } from '../model/getNextPayout'
import { Worker } from '../types'

interface Props {
  workers: Worker[]
}

export const NextPayoutStat = ({ workers }: Props) => {
  const blockNumber = useCurrentBlockNumber()
  const nextPayout = useMemo(() => blockNumber && getNextPayout(workers, blockNumber), [
    workers.length,
    blockNumber?.toNumber(),
  ])

  return <TokenValueStat title={'Next payout in'} value={nextPayout ?? 0} />
}
