import { useMemo } from 'react'

import { useGetWorkersQuery } from '../queries'

export const useMyWorkers = () => {
  const options = { variables: {} }
  const { data, loading } = useGetWorkersQuery(options)
  const workers = useMemo(() => data && data.workers, [data, loading])

  return { workers, isLoading: loading }
}
