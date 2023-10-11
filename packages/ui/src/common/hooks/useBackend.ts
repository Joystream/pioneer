import type { MutationOptions, QueryOptions } from '@apollo/client'
import type { GraphQLError } from 'graphql'
import { useCallback, useContext, useEffect, useReducer, useState } from 'react'

import { BackendContext } from '@/app/providers/backend/context'

type EagerQueryOptions = { skip?: boolean } & QueryOptions & Pick<Required<QueryOptions>, 'variables'>
type LazyQueryOptions = { skip?: boolean } & Omit<QueryOptions, 'variables'>
type LazyMutationOptions = Omit<MutationOptions, 'variables'>
type Props = (EagerQueryOptions | LazyQueryOptions | LazyMutationOptions) & { skip?: boolean }

type SendRes<T> = Promise<{ data?: T; error?: GraphQLError }>
type UseBackendEager<T> = { data?: T; error?: GraphQLError }
type UseBackendLazy<T> = { data?: T; error?: GraphQLError; send: (variables: any) => SendRes<T> }
type UseBackend<T> = UseBackendEager<T> | UseBackendLazy<T>

const MAX_RETRY = 10
const RETRY_INTERVAL = 5_000

export function useBackend<T>(props: EagerQueryOptions): UseBackendEager<T>
export function useBackend<T>(props: LazyQueryOptions): UseBackendLazy<T>
export function useBackend<T>(props: LazyMutationOptions): UseBackendLazy<T>
export function useBackend<T>({ skip = false, ...options }: Props): UseBackend<T> {
  const [data, setData] = useState<T | undefined>()
  const [error, setError] = useState<GraphQLError | undefined>()
  const backendClient = useContext(BackendContext)?.backendClient
  const [retry, incrementRetry] = useReducer((retry) => retry + 1, 0)

  const queryOptions = 'query' in options ? options : undefined
  const mutationOptions = 'mutation' in options ? options : undefined
  const variables = 'variables' in options && options.variables
  const isEagerQuery = !!variables

  const send = useCallback(
    async (variables: any): SendRes<T> => {
      const query = queryOptions && backendClient?.query({ ...queryOptions, variables })
      const mutation = mutationOptions && backendClient?.mutate({ ...mutationOptions, variables })
      const res = await (query ?? mutation)

      if (!res) return {}

      const error = res.errors?.[0]
      const data = res.data ?? undefined

      if (error) setError(error)
      setData(data)

      return { data, error }
    },
    [backendClient]
  )

  useEffect(() => {
    if (!isEagerQuery || skip || retry > MAX_RETRY) return

    let timeout: ReturnType<typeof setTimeout>
    send(variables).catch(() => (timeout = setTimeout(incrementRetry, RETRY_INTERVAL)))
    return () => clearTimeout(timeout)
  }, [send, JSON.stringify(variables), skip, retry])

  return isEagerQuery ? { data, error } : { data, error, send }
}
