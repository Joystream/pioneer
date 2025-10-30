import { ApolloQueryResult, OnQueryUpdated, useApolloClient } from '@apollo/client'
import { DependencyList, useEffect, useRef } from 'react'

interface RefetchOptions {
  when?: boolean
  after?: boolean
  interval?: number
  include?: 'all' | 'active' | string[]
}

const DefaultOptions: RefetchOptions = {
  when: true,
  include: 'active',
}

export const useRefetchQueries = (
  { when = true, after, interval, include = 'active' } = DefaultOptions,
  deps?: DependencyList
) => {
  const isRefetched = useRef(false)
  const apolloClient = useApolloClient()
  const couldRefetchNext = useRef(typeof after === 'undefined')
  const onQueryUpdated: OnQueryUpdated<Promise<ApolloQueryResult<any>>> = (_, { complete }) => {
    if (complete) {
      isRefetched.current = true
    }
    return complete ?? false
  }

  useEffect(() => {
    if (couldRefetchNext.current && when) {
      if (interval) {
        const handler = setInterval(() => apolloClient.refetchQueries({ include, onQueryUpdated }), interval)
        return () => {
          clearInterval(handler)
        }
      } else {
        apolloClient.refetchQueries({ include, onQueryUpdated })
      }
    }
    couldRefetchNext.current = after !== false
  }, deps)

  return isRefetched.current
}
