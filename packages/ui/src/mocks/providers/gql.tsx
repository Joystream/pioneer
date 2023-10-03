import { DocumentNode } from '@apollo/client/core'
import React, { FC, createContext, useCallback, useContext, useMemo, useState } from 'react'

import { warning } from '@/common/logger'

import { BLOCK_HEAD } from './api'

export { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client/core'
export { ApolloProvider } from '@apollo/client/react'

type OptionVariables = { where?: Record<string, any>; orderBy?: string | string[]; limit?: number; offset?: number }
type Options = { variables?: OptionVariables; skip?: boolean }
type Result = { loading: boolean; data: any }
type Resolver = (options?: Options) => Result

type GqlOperationsMap = Map<DocumentNode, Resolver>
const GqlMockContext = createContext<GqlOperationsMap>(new Map())

export const useQuery = (query: DocumentNode, options?: Options): Result => {
  const qnMocks = useContext(GqlMockContext)

  if (!qnMocks.has(query)) {
    warning('Missing mock query:', (query.definitions[0] as any).name.value ?? query.loc?.source.body)
  }

  const result = qnMocks.get(query)?.(options) ?? { loading: false, data: undefined }
  return useMemo<Result>(() => result, [JSON.stringify(result)])
}

export const useLazyQuery = (query: DocumentNode, options?: Options): [() => void, Result] => {
  const result = useContext(GqlMockContext).get(query)?.(options) ?? { loading: false, data: undefined }
  const [lazyResult, setLazyResult] = useState<Result>({ loading: true, data: undefined })
  const get = useCallback(() => setLazyResult(result), [JSON.stringify(result)])

  return [get, lazyResult]
}

export const useSubscription = () => ({ data: { stateSubscription: { indexerHead: BLOCK_HEAD } } })

export const useMutation = (mutation: DocumentNode, options?: Options): [() => void, Result] => {
  const qnMocks = useContext(GqlMockContext)

  if (!qnMocks.has(mutation)) {
    warning('Missing mock mutation:', (mutation.definitions[0] as any).name.value ?? mutation.loc?.source.body)
  }

  const result = qnMocks.get(mutation)?.(options) ?? { loading: false, data: undefined }
  const [mutationResult, setMutationResult] = useState<Result>({ loading: true, data: undefined })
  const mutate = useCallback(() => {
    setMutationResult(result)
    return Promise.resolve(result.data)
  }, [JSON.stringify(result)])

  return [mutate, mutationResult]
}

export const useApolloClient = () => ({
  refetchQueries: () => undefined,
  query: () => undefined,
  mutate: () => undefined,
})

type GqlQueryMock = { query: DocumentNode; data?: any; resolver?: Resolver }
type GqlMutationMock = { mutation: DocumentNode; data?: any; error?: any; resolver?: Resolver; onSend?: () => void }

export type MockGqlProps = { queries?: GqlQueryMock[]; mutations?: GqlMutationMock[] }

export const MockGqlProvider: FC<MockGqlProps> = ({ children, queries, mutations }) => {
  const operationsMap = useMemo(() => {
    const preparedQueries =
      queries?.map<[DocumentNode, Resolver]>(({ query, data, resolver }) => [
        query,
        (options) => resolver?.(options) ?? { loading: false, data },
      ]) ?? []
    const preparedMutations =
      mutations?.map<[DocumentNode, Resolver]>(({ mutation, data, error, resolver, onSend }) => [
        mutation,
        (options) => {
          const result = resolver?.(options) ?? { loading: false, data: error ? undefined : data, error }
          onSend?.()
          return result
        },
      ]) ?? []
    return new Map([...preparedQueries, ...preparedMutations])
  }, [queries, mutations])

  return <GqlMockContext.Provider value={operationsMap}>{children}</GqlMockContext.Provider>
}
