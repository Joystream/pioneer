import { RefetchQueriesOptions, useApolloClient } from '@apollo/client'
import { DependencyList, useEffect, useRef } from 'react'

interface RefetchOptions {
  when?: boolean
  after?: boolean
  refetchQueriesOptions?: RefetchQueriesOptions<any, any>
}

const DefaultOptions: RefetchOptions = {
  when: true,
  refetchQueriesOptions: { include: 'active' },
}

export const useRefetchQueries = (
  { when = true, after, refetchQueriesOptions = { include: 'active' } } = DefaultOptions,
  deps?: DependencyList
) => {
  const apolloClient = useApolloClient()
  const couldRefetchNext = useRef(typeof after === undefined)

  useEffect(() => {
    if (couldRefetchNext.current && when) {
      apolloClient.refetchQueries(refetchQueriesOptions)
    }
    couldRefetchNext.current = after !== false
  }, deps)
}
