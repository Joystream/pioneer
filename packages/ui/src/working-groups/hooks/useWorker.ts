import { useMemo } from 'react'

import { useGetWorkerQuery } from '../queries'
import { asWorkerWithDetails } from '../types'

export const useWorker = (id: string) => {
  const params = { variables: { where: { id: id } } }

  const { data, loading, error } = useGetWorkerQuery(params)

  const rawWorker = data && data.workerByUniqueInput
  const worker = useMemo(() => rawWorker && asWorkerWithDetails(rawWorker), [rawWorker?.id])

  return { worker, isLoading: loading, error }
}
