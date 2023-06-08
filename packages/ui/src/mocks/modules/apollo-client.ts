import { DocumentNode } from '@apollo/client/core'
import { useCallback, useMemo, useState } from 'react'

export { gql } from '@apollo/client/core'

type Options = { variables: any; skip: boolean }
type Result = { loading: boolean; data: any }

const queryResults = new Map<DocumentNode, (options?: Options) => Result>()

export const useQuery = (query: DocumentNode, options?: Options): Result => {
  const result = queryResults.get(query)?.(options) ?? { loading: false, data: undefined }
  return useMemo<Result>(() => result, [JSON.stringify(result)])
}

export const useLazyQuery = (query: DocumentNode, options?: Options): [() => void, Result] => {
  const result = queryResults.get(query)?.(options) ?? { loading: false, data: undefined }
  const [lazyResult, setLazyResult] = useState<Result>({ loading: true, data: undefined })
  const get = useCallback(() => setLazyResult(result), [JSON.stringify(result)])

  return [get, lazyResult]
}

export const useSubscription = useQuery

export const useApolloClient = () => ({
  refetchQueries: () => undefined,
  query: () => undefined,
})

type QNMock = { query: DocumentNode; data?: any; resolver: (options?: Options, args?: any) => Result }
type Context = { args: any; parameters: { queryNode?: QNMock[] } }

export const QNDecorator = (story: CallableFunction, { args, parameters }: Context) => {
  parameters.queryNode?.forEach(({ query, data, resolver }) => {
    queryResults.set(query, (options?: Options) => resolver?.(options, args) ?? { loading: false, data })
  })

  return story()
}
