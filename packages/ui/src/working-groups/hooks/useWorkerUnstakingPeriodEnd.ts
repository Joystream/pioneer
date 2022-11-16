import BN from 'bn.js'
import { useMemo } from 'react'

import { SECONDS_PER_BLOCK } from '@/common/constants'

import { useGetWorkerUnstakingDetailsQuery } from '../queries'

const milliseconds = 1000

export const useWorkerUnstakingPeriodEnd = (workerId?: string) => {
  const { data, loading } = useGetWorkerUnstakingDetailsQuery({
    variables: { where: { id: workerId ?? '' } },
    skip: !workerId,
  })
  const unstakingPeriodEnd = useMemo(() => {
    if (
      data?.workerByUniqueInput?.status.__typename !== 'WorkerStatusLeaving' ||
      !data.workerByUniqueInput.status.workerStartedLeavingEvent?.createdAt
    ) {
      return undefined
    }
    const unstakingPeriodBlocks = new BN(data.workerByUniqueInput.application.opening.unstakingPeriod).toNumber()
    const unstakingPeriod = unstakingPeriodBlocks * SECONDS_PER_BLOCK * milliseconds
    const unstakingStart = new Date(data.workerByUniqueInput.status.workerStartedLeavingEvent.createdAt).valueOf()
    return new Date(unstakingStart + unstakingPeriod).toString()
  }, [loading, data])
  return {
    isLoading: loading,
    unstakingPeriodEnd,
  }
}
