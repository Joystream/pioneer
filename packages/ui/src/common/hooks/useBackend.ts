import { QueryOptions } from '@apollo/client'
import { useContext, useEffect, useReducer, useState } from 'react'

import { BackendContext } from '@/app/providers/backend/context'

type Props = QueryOptions & { skip?: boolean }
type UseBackend<T> = { data?: T; error?: Error }

export const useBackend = <T>({ skip = false, ...queryOptions }: Props): UseBackend<T> => {
  const [data, setData] = useState<T | undefined>()
  const [error, setError] = useState<Error | undefined>()
  const backendClient = useContext(BackendContext)
  const [retry, incrementRetry] = useReducer((retry) => retry + 1, 0)

  useEffect(() => {
    if (!backendClient || skip) return

    let timeout: ReturnType<typeof setTimeout>
    backendClient.query(queryOptions).then(
      ({ data, error }) => {
        if (error) {
          setError(error)
        } else {
          setData(data ?? undefined)
        }
      },
      (err) => {
        setError(err)
        timeout = setTimeout(incrementRetry, 5_000)
      }
    )

    return () => clearTimeout(timeout)
  }, [JSON.stringify(queryOptions.variables), backendClient, retry])

  return { data, error }
}