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

type QueryMap = Map<DocumentNode, Resolver>
const QNMockContext = createContext<QueryMap>(new Map())

export const useQuery = (query: DocumentNode, options?: Options): Result => {
  const qnMocks = useContext(QNMockContext)

  if (!qnMocks.has(query)) {
    warning('Missing mock query:', (query.definitions[0] as any).name.value ?? query.loc?.source.body)
  }

  const result = qnMocks.get(query)?.(options) ?? { loading: false, data: undefined }
  return useMemo<Result>(() => result, [JSON.stringify(result)])
}

export const useLazyQuery = (query: DocumentNode, options?: Options): [() => void, Result] => {
  const result = useContext(QNMockContext).get(query)?.(options) ?? { loading: false, data: undefined }
  const [lazyResult, setLazyResult] = useState<Result>({ loading: true, data: undefined })
  const get = useCallback(() => setLazyResult(result), [JSON.stringify(result)])

  return [get, lazyResult]
}

export const useSubscription = () => ({ data: { stateSubscription: { indexerHead: BLOCK_HEAD } } })

export const useApolloClient = () => ({
  refetchQueries: () => undefined,
  query: () => undefined,
})

type QNMock = { query: DocumentNode; data?: any; resolver?: Resolver }

export type MockQNProps = { queryNode?: QNMock[] }

export const MockQNProvider: FC<MockQNProps> = ({ children, queryNode }) => {
  const queryMap = useMemo(
    () =>
      new Map(
        queryNode?.map<[DocumentNode, Resolver]>(({ query, data, resolver }) => [
          query,
          (options) => resolver?.(options) ?? { loading: false, data },
        ])
      ),
    [queryNode]
  )

  return <QNMockContext.Provider value={queryMap}>{children}</QNMockContext.Provider>
}
