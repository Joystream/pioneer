import { useMemo } from 'react'

import { useGetWorkersQuery } from '../queries'
import { asWorkerWithDetails } from '../types'

export const useWorker = (id: string) => {
  const params = { variables: { where: { id_eq: id } } }

  const { data, loading } = useGetWorkersQuery(params)

  const rawWorker = data && data.workers && data.workers.length ? data.workers[0] : null
  const worker = useMemo(() => rawWorker && asWorkerWithDetails(rawWorker), [rawWorker?.id])

  return { worker, isLoading: loading }
}
