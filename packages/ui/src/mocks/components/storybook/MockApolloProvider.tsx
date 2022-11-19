import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, useApolloClient } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'

import { NetworkEndpoints, pickEndpoints } from '@/app/config'
import {
  seedApplications,
  seedBounties,
  seedBountyContributions,
  seedBountyEntries,
  seedCouncilCandidates,
  seedCouncilElections,
  seedCouncilMembers,
  seedElectedCouncils,
  seedMembers,
  seedOpenings,
  seedOpeningStatuses,
  seedProposals,
  seedUpcomingOpenings,
  seedWorkers,
  updateWorkingGroups,
} from '@/mocks/data'
import {
  RawForumCategoryMock,
  RawForumPostMock,
  RawForumThreadMock,
  seedForumCategories,
  seedForumCategory,
  seedForumPost,
  seedForumPosts,
  seedForumThread,
  seedForumThreads,
} from '@/mocks/data/seedForum'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'
import { fixAssociations, makeServer } from '@/mocks/server'

interface ForumSeed {
  categories: RawForumCategoryMock[]
  threads: RawForumThreadMock[]
  posts: RawForumPostMock[]
}

interface Seeds {
  blocks?: boolean
  members?: boolean
  workingGroups?: boolean
  proposals?: boolean
  workers?: boolean
  forum?: boolean | ForumSeed
  council?: boolean
  bounty?: boolean
}

const link = new HttpLink({
  uri: 'http://localhost:8081/graphql',
  fetch: (uri, options) => fetch(uri, options),
})

// NOTE Use the global context instead of a hook for performance (otherwise hot reloads take too long)
declare let MockServer: Seeds & { server: ReturnType<typeof makeServer> }

export const MockApolloProvider: FC<Seeds> = ({ children, ...toSeed }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!('MockServer' in window)) {
      const glob = global as any
      glob.MockServer = {}
      MockServer.server = makeServer('storybook', pickEndpoints('local') as NetworkEndpoints)
      fixAssociations(MockServer.server)
    }

    if (toSeed.members && !MockServer.members) {
      seedMembers(MockServer.server)
      MockServer.members = true
    }
    if ((toSeed.workingGroups || toSeed.workers) && !MockServer.workingGroups) {
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

    if (toSeed.forum && JSON.stringify(toSeed.forum) !== JSON.stringify(MockServer.forum)) {
      if (toSeed.forum === true) {
        seedForumCategories(MockServer.server)
        seedForumThreads(MockServer.server)
        seedForumPosts(MockServer.server)
      } else {
        toSeed.forum?.categories.forEach((category) => seedForumCategory(category, MockServer.server))
        toSeed.forum?.threads.forEach((thread) => seedForumThread(thread, MockServer.server))
        toSeed.forum?.posts.forEach((post) => seedForumPost(post, MockServer.server))
      }
      MockServer.forum = toSeed.forum
    }

    if (toSeed.council) {
      seedElectedCouncils(MockServer.server)
      seedCouncilMembers(MockServer.server)
      seedCouncilElections(MockServer.server)
      seedCouncilCandidates(MockServer.server)
    }

    if (toSeed.bounty) {
      seedBounties(MockServer.server)
      seedBountyContributions(MockServer.server)
      seedBountyEntries(MockServer.server)
    }

    setReady(true)
  }, [])

  return (
    <ApolloProvider client={new ApolloClient({ link, cache: new InMemoryCache() })}>
      {ready ? children : <h3>Starting mock server...</h3>}
    </ApolloProvider>
  )
}

interface QueryProps {
  call: (client: ReturnType<typeof useApolloClient>) => void
}
export const Query = ({ call }: QueryProps) => {
  const client = useApolloClient()
  useEffect(() => call(client), [])
  return null
}
