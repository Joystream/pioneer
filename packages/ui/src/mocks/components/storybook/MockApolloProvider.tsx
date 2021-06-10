import React, { FC, useEffect, useState } from 'react'

import { seedMembers } from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { fixAssociations, makeServer } from '@/mocks/server'

import { MockApolloProvider as TestMockApolloProvider } from '../../../../test/_mocks/providers'

interface Seeds {
  blocks?: boolean
  members?: boolean
  workingGroups?: boolean
}

// NOTE Use the global context instead of a hook for performance (otherwise hot reloads take too long)
declare let MockServer: Seeds & { server: ReturnType<typeof makeServer> }

export const MockApolloProvider: FC<Seeds> = ({ children, ...toSeed }) => {
  const [started, setStarted] = useState('MockServer' in window)

  useEffect(() => {
    if (!started) {
      const glob = global as any
      glob.MockServer = {}
      MockServer.server = makeServer('storybook')
      fixAssociations(MockServer.server)
      setStarted(true)
    }

    if (toSeed.members && !MockServer.members) {
      seedMembers(MockServer.server)
      MockServer.members = true
    }
    if (toSeed.workingGroups && !MockServer.workingGroups) {
      seedWorkingGroups(MockServer.server)
      MockServer.workingGroups = true
    }
  }, [])

  return <TestMockApolloProvider>{started ? children : <h3>Starting mock server...</h3>}</TestMockApolloProvider>
}
