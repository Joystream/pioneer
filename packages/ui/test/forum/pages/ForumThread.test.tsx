import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { generatePath, Route, Switch } from 'react-router-dom'

import { ForumThread as ForumThreadPage } from '@/app/pages/Forum/ForumThread'
import { NotFound } from '@/app/pages/NotFound'
import { CKEditorProps } from '@/common/components/CKEditor'
import { ForumRoutes } from '@/forum/constant'
import { ForumThread, ForumThreadWithDetails } from '@/forum/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockApiProvider, MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts } from '../../_mocks/transactions'
import { loaderSelector } from '../../setup'

let mockThread: { isLoading: boolean; thread: ForumThread | null }
let mockSuggestedThreads: { isLoading: boolean; threads: ForumThread[] }

jest.mock('../../../src/forum/hooks/useForumThread', () => ({
  useForumThread: () => mockThread,
}))

jest.mock('../../../src/forum/hooks/useForumSuggestedThreads', () => ({
  useForumSuggestedThreads: () => mockSuggestedThreads,
}))

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Forum Thread Page', () => {
  const mockServer = setupMockServer()

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [getMember('alice'), getMember('bob')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const forumThread: ForumThreadWithDetails = {
    id: '1',
    title: 'Example Thread',
    categoryId: '1',
    initialPostText: '',
    categoryTitle: '',
    author: getMember('alice'),
    isSticky: false,
    createdInBlock: randomBlock(),
    tags: [],
    visiblePostsCount: 0,
    status: { __typename: 'ThreadStatusActive' },
  }

  beforeAll(() => {
    stubAccounts([alice, bob])
    seedMembers(mockServer.server, 2)
  })

  beforeEach(() => {
    mockThread = {
      isLoading: false,
      thread: null,
    }
    mockSuggestedThreads = {
      isLoading: false,
      threads: [],
    }
  })

  it('Loading', () => {
    mockThread.isLoading = true
    renderPage()

    expect(loaderSelector()).not.toBeNull()

    expect(screen.queryByText(/copy link/i)).toBeNull()
    expect(screen.queryByText(/watch thread/i)).toBeNull()
  })

  it('Not Found - no such thread', () => {
    renderPage()

    expect(screen.queryByText(/not found/i)).toBeInTheDocument()
  })

  it('Renders', () => {
    mockThread.thread = forumThread
    renderPage()

    waitForElementToBeRemoved(loaderSelector())

    expect(screen.queryByText(/copy link/i)).not.toBeNull()
    expect(screen.queryByText(/watch thread/i)).not.toBeNull()
    expect(screen.queryByText(forumThread.title)).not.toBeNull()
  })

  function renderPage() {
    return render(
      <MockApiProvider>
        <MemoryRouter initialEntries={[generatePath(ForumRoutes.thread, { id: '1' })]}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <MembershipContext.Provider value={useMyMemberships}>
                <Switch>
                  <Route path={ForumRoutes.thread} component={ForumThreadPage} />
                  <Route path="/404" component={NotFound} />
                </Switch>
              </MembershipContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </MemoryRouter>
      </MockApiProvider>
    )
  }
})
