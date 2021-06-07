import React, { useMemo } from 'react'

import { StatisticItem } from '../../common/components/statistics'
import { NumericValue } from '../../common/components/statistics/NumericValueStat'
import { TextMedium } from '../../common/components/typography'
import { useCurrentBlockNumber } from '../../common/hooks/useCurrentBlockNumber'
import { blocksToTime } from '../../common/model/blocksToTime'
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

  return (
    <StatisticItem title={'Next payout in'}>
      <NumericValue>{nextPayout?.toString() ?? 0} blocks</NumericValue>
      <TextMedium lighter>({nextPayout && blocksToTime(nextPayout)})</TextMedium>
    </StatisticItem>
  )
}
