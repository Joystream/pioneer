import React, { useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'

import { StatisticItem } from '../../common/components/statistics'
import { NumericValue } from '../../common/components/statistics/NumericValueStat'
import { TextMedium } from '../../common/components/typography'
import { useCurrentBlockNumber } from '../../common/hooks/useCurrentBlockNumber'
import { getNextPayout } from '../model/getNextPayout'
import { Worker } from '../types'

interface Props {
  workers: Worker[]
}

export const NextPayoutStat = ({ workers }: Props) => {
  const blockNumber = useCurrentBlockNumber()
  const { api } = useApi()

  const nextPayout = useMemo(
    () => blockNumber && getNextPayout(workers, blockNumber, api),
    [workers.length, blockNumber]
  )

  return (
    <StatisticItem title="Next payout in">
      <NumericValue>{nextPayout ? nextPayout?.toString() + ' blocks' : '–'}</NumericValue>
      {nextPayout && <TextMedium lighter>({nextPayout && nextPayout})</TextMedium>}
    </StatisticItem>
  )
}
