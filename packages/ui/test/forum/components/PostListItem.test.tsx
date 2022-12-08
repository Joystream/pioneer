import { render, screen } from '@testing-library/react'
import React from 'react'
import { generatePath, MemoryRouter } from 'react-router-dom'

import { PostList } from '@/forum/components/PostList/PostList'
import { ForumRoutes } from '@/forum/constant'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { RawForumPostMock, seedForumCategory, seedForumPost, seedForumThread } from '@/mocks/data/seedForum'

import { mockCategories, mockThreads } from '../../_mocks/forum'
import { getMember } from '../../_mocks/members'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const post: RawForumPostMock = {
  id: '2',
  threadId: '0',
  authorId: '0',
  text: 'text',
  edits: [],
  postAddedEvent: {
    inBlock: 885,
    createdAt: '2021-04-22T17:54:04.747Z',
    network: 'OLYMPIA',
    text: 'text',
  },
  status: 'PostStatusActive',
  deletedInEvent: null,
  postModeratedEvent: null,
}

describe('UI: Post list item', () => {
  const server = setupMockServer()

  const useMyMemberships: MyMemberships = {
    active: getMember('alice'),
    members: [getMember('alice')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  beforeEach(() => {
    seedMembers(server.server, 2)
    mockCategories.map((category) => seedForumCategory(category, server.server))
    seedForumThread(mockThreads[0], server.server)
  })

  describe('Active thread', () => {
    it("Another user's post", async () => {
      seedForumPost({ ...post, authorId: '1' }, server.server)
      renderPost(true)
      expect(await screen.findByTitle('Reply')).not.toBeDisabled()
      expect(await screen.findByTitle('Copy link')).not.toBeDisabled()
      expect(screen.queryByTitle('Post actions')).toBeNull()
    })

    it('Own post', async () => {
      seedForumPost({ ...post }, server.server)
      renderPost(true)
      expect(await screen.findByTitle('Reply')).not.toBeDisabled()
      expect(await screen.findByTitle('Copy link')).not.toBeDisabled()
      expect(await screen.findByTitle('Post actions')).not.toBeDisabled()
    })

    it('Locked own post', async () => {
      seedForumPost({ ...post, status: 'PostStatusLocked' }, server.server)
      renderPost(true)
      expect(await screen.findByTitle('Reply')).not.toBeDisabled()
      expect(await screen.findByTitle('Copy link')).not.toBeDisabled()
      expect(screen.queryByTitle('Post actions')).toBeNull()
    })
  })

  describe('Locked thread', () => {
    it("Another user's post", async () => {
      seedForumPost({ ...post, authorId: '1' }, server.server)
      renderPost(false)
      expect(screen.queryByTitle('Reply')).toBeNull()
      expect(await screen.findByTitle('Copy link')).not.toBeDisabled()
      expect(screen.queryByTitle('Post actions')).toBeNull()
    })

    it('Own post', async () => {
      seedForumPost({ ...post }, server.server)
      renderPost(false)
      expect(screen.queryByTitle('Reply')).toBeNull()
      expect(await screen.findByTitle('Copy link')).not.toBeDisabled()
      expect(screen.queryByTitle('Post actions')).toBeNull()
    })

    it('Locked own post', async () => {
      seedForumPost({ ...post, status: 'PostStatusLocked' }, server.server)
      renderPost(false)
      expect(screen.queryByTitle('Reply')).toBeNull()
      expect(await screen.findByTitle('Copy link')).not.toBeDisabled()
      expect(screen.queryByTitle('Post actions')).toBeNull()
    })
  })

  const renderPost = (isThreadActive: boolean) =>
    render(
      <MemoryRouter initialEntries={[generatePath(ForumRoutes.thread, { id: '0' })]}>
        <MembershipContext.Provider value={useMyMemberships}>
          <MockApolloProvider>
            <PostList threadId="0" isThreadActive={isThreadActive} />
          </MockApolloProvider>
        </MembershipContext.Provider>
      </MemoryRouter>
    )
})
