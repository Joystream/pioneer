import { useApolloClient } from '@apollo/client'
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
  const apolloClient = useApolloClient()
  const couldRefetchNext = useRef(typeof after === undefined)

  useEffect(() => {
    if (couldRefetchNext.current && when) {
      if (interval) {
        const handler = setInterval(() => {
          apolloClient.refetchQueries({ include })
        }, interval)

        return () => {
          clearInterval(handler)
        }
      } else {
        apolloClient.refetchQueries({ include })
      }
    }
    couldRefetchNext.current = after !== false
  }, deps)
}
