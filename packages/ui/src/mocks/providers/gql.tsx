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

type GqlQueriesMap = Map<DocumentNode, Resolver>
type GqlMutationsMap = Map<DocumentNode, [(...args: any[]) => void, Resolver]>
type GqlContextValue = {
  queries: GqlQueriesMap
  mutations: GqlMutationsMap
}
const GqlMockContext = createContext<GqlContextValue>({
  queries: new Map(),
  mutations: new Map(),
})

export const useQuery = (query: DocumentNode, options?: Options): Result => {
  const mockedQueriesMap = useContext(GqlMockContext).queries

  if (!mockedQueriesMap.has(query)) {
    warning('Missing mock query:', (query.definitions[0] as any).name.value ?? query.loc?.source.body)
  }

  const result = mockedQueriesMap.get(query)?.(options) ?? { loading: false, data: undefined }
  return useMemo<Result>(() => result, [JSON.stringify(result)])
}

export const useLazyQuery = (query: DocumentNode, options?: Options): [() => void, Result] => {
  const result = useContext(GqlMockContext).queries.get(query)?.(options) ?? { loading: false, data: undefined }
  const [lazyResult, setLazyResult] = useState<Result>({ loading: true, data: undefined })
  const get = useCallback(() => setLazyResult(result), [JSON.stringify(result)])

  return [get, lazyResult]
}

export const useSubscription = () => ({ data: { stateSubscription: { indexerHead: BLOCK_HEAD } } })

export const useMutation = (mutation: DocumentNode, options?: Options): [() => void, Result] => {
  const mockedMutationsMap = useContext(GqlMockContext).mutations

  if (!mockedMutationsMap.has(mutation)) {
    warning('Missing mock mutation:', (mutation.definitions[0] as any).name.value ?? mutation.loc?.source.body)
  }

  const mockedMutation = mockedMutationsMap.get(mutation)
  const spy = mockedMutation?.[0]
  const result = mockedMutation?.[1]?.(options) ?? { loading: false, data: undefined }

  const [mutationResult, setMutationResult] = useState<Result>({ loading: true, data: undefined })
  const mutate = useCallback(
    (...args: any[]) => {
      spy?.(...args)
      setMutationResult(result)
      return Promise.resolve(result.data)
    },
    [JSON.stringify(result)]
  )

  return [mutate, mutationResult]
}

export const useApolloClient = () => ({
  refetchQueries: () => undefined,
  query: () => undefined,
  mutate: () => undefined,
})
export const makeVar = () => {}

type GqlQueryMock = { query: DocumentNode; data?: any; resolver?: Resolver }
type GqlMutationMock = {
  mutation: DocumentNode
  data?: any
  error?: any
  resolver?: Resolver
  onSend?: (...args: any[]) => void
}

export type MockGqlProps = { queries?: GqlQueryMock[]; mutations?: GqlMutationMock[] }

export const MockGqlProvider: FC<MockGqlProps> = ({ children, queries, mutations }) => {
  const queriesMap = useMemo(
    () =>
      new Map(
        queries?.map<[DocumentNode, Resolver]>(({ query, data, resolver }) => [
          query,
          (options) => resolver?.(options) ?? { loading: false, data },
        ]) ?? []
      ),
    [queries]
  )
  const mutationsMap = useMemo(
    () =>
      new Map(
        mutations?.map<[DocumentNode, [(...args: any[]) => void, Resolver]]>(
          ({ mutation, data, error, resolver, onSend }) => [
            mutation,
            [
              onSend || (() => undefined),
              (options) => {
                const result = resolver?.(options) ?? { loading: false, data: error ? undefined : data, error }
                return result
              },
            ],
          ]
        ) ?? []
      ),
    [mutations]
  )

  return (
    <GqlMockContext.Provider
      value={{
        queries: queriesMap,
        mutations: mutationsMap,
      }}
    >
      {children}
    </GqlMockContext.Provider>
  )
}
