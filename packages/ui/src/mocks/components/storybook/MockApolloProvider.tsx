import React, { FC, useEffect, useState } from 'react'

import {
  seedApplications,
  seedMembers,
  seedOpenings,
  seedOpeningStatuses,
  seedProposals,
  seedUpcomingOpenings,
  seedWorkers,
  updateWorkingGroups,
} from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'
import { fixAssociations, makeServer } from '@/mocks/server'

import { MockApolloProvider as TestMockApolloProvider } from '../../../../test/_mocks/providers'

interface Seeds {
  blocks?: boolean
  members?: boolean
  workingGroups?: boolean
  proposals?: boolean
  workers?: boolean
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

    if (toSeed.workers && !MockServer.workers) {
      seedOpeningStatuses(MockServer.server)
      seedOpenings(MockServer.server)
      seedUpcomingOpenings(MockServer.server)
      seedApplications(MockServer.server)
      seedWorkers(MockServer.server)
      MockServer.workers = true
    }

    if (MockServer.workers && MockServer.workingGroups) {
      updateWorkingGroups(MockServer.server)
    }

    if (toSeed.proposals && !MockServer.proposals) {
      seedProposals(MockServer.server)
      MockServer.proposals = true
    }
  }, [])

  return <TestMockApolloProvider>{started ? children : <h3>Starting mock server...</h3>}</TestMockApolloProvider>
}
