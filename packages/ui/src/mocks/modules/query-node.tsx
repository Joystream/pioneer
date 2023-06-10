import { DocumentNode } from '@apollo/client/core'
import { isFunction } from 'lodash'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export { gql } from '@apollo/client/core'

type Options = { variables: any; skip: boolean } | undefined
type Result = { loading: boolean; data: any }
type Resolver = (options: Options) => Result

type QueryMap = Map<DocumentNode, Resolver>
const QNMockContext = createContext<QueryMap>(new Map())

export const useQuery = (query: DocumentNode, options?: Options): Result => {
  const result = useContext(QNMockContext).get(query)?.(options) ?? { loading: false, data: undefined }
  return useMemo<Result>(() => result, [JSON.stringify(result)])
}

export const useLazyQuery = (query: DocumentNode, options?: Options): [() => void, Result] => {
  const result = useContext(QNMockContext).get(query)?.(options) ?? { loading: false, data: undefined }
  const [lazyResult, setLazyResult] = useState<Result>({ loading: true, data: undefined })
  const get = useCallback(() => setLazyResult(result), [JSON.stringify(result)])

  return [get, lazyResult]
}

export const useSubscription = useQuery

export const useApolloClient = () => ({
  refetchQueries: () => undefined,
  query: () => undefined,
})

type QNMock = { query: DocumentNode; data?: any; resolver?: Resolver }
type Context = { args: any; parameters: { queryNode?: QNMock[] | ((args: any) => QNMock[]) } }

export const QNDecorator = (Story: CallableFunction, { args, parameters }: Context) => {
  const params = useMemo(
    () => (isFunction(parameters.queryNode) ? parameters.queryNode(args) : parameters.queryNode),
    [isFunction(parameters.queryNode) && args]
  )

  const queryMap = useMemo(
    () =>
      new Map(
        params?.map<[DocumentNode, Resolver]>(({ query, data, resolver }) => [
          query,
          (options) => resolver?.(options) ?? { loading: false, data },
        ])
      ),
    [params]
  )

  return (
    <QNMockContext.Provider value={queryMap}>
      <Story />
    </QNMockContext.Provider>
  )
}
