import React, { useEffect } from 'react'

import { seedBlocks } from '@/mocks/data'
import { fixAssociations, makeServer } from '@/mocks/server'

import { MockApolloProvider as TestMockApolloProvider } from '../../../../test/_mocks/providers'

// NOTE Use the global context instead of a hook for performance (otherwise hot reloads take too long)
declare let MockServer: any

export const MockApolloProvider: typeof TestMockApolloProvider = (props) => {
  useEffect(() => {
    if (!('MockServer' in window)) {
      const glob = global as any
      glob.MockServer = makeServer('storybook')
      fixAssociations((MockServer as unknown) as any)
      seedBlocks(MockServer)
    }
  }, [])

  return <TestMockApolloProvider {...props} />
}
