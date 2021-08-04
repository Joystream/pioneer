import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ForumThread as ForumThreadPage } from '@/app/pages/Forum/ForumThread'
import { NotFound } from '@/app/pages/NotFound'
import { ForumThread, ForumThreadWithDetails } from '@/forum/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockApiProvider, MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

let mockThread: { isLoading: boolean; thread: ForumThread | null }
let mockSuggestedThreads: { isLoading: boolean; threads: ForumThread[] }

jest.mock('../../../src/forum/hooks/useForumThread', () => ({
  useForumThread: () => mockThread,
}))

jest.mock('../../../src/forum/hooks/useForumSuggestedThreads', () => ({
  useForumSuggestedThreads: () => mockSuggestedThreads,
}))

describe('UI: Forum Thread Page', () => {
  const mockServer = setupMockServer()

  const useAccounts: UseAccounts = {
    hasAccounts: true,
    allAccounts: [alice, bob],
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [getMember('alice'), getMember('bob')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  const forumThread: ForumThreadWithDetails = {
    id: '1',
    title: 'Example Thread',
    categoryId: '1',
    isSticky: false,
    createdInBlock: randomBlock(),
  }

  beforeAll(() => {
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

    expect(screen.queryByText('Loading...')).not.toBeNull()

    expect(screen.queryByText(/copy link/i)).toBeNull()
    expect(screen.queryByText(/watch thread/i)).toBeNull()
  })

  it('Renders', () => {
    mockThread.thread = forumThread
    renderPage()

    expect(screen.queryByText('Loading...')).toBeNull()

    expect(screen.queryByText(/copy link/i)).not.toBeNull()
    expect(screen.queryByText(/watch thread/i)).not.toBeNull()
    expect(screen.queryByText(forumThread.title)).not.toBeNull()
  })

  it('Not Found - no such thread', () => {
    renderPage()

    expect(screen.queryByText(/not found/i)).not.toBeNull()
  })

  function renderPage() {
    return render(
      <MockApiProvider>
        <MemoryRouter initialEntries={['/forum/thread/1']}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <MembershipContext.Provider value={useMyMemberships}>
                  <Switch>
                    <Route path="/forum/thread/:id" component={ForumThreadPage} />
                    <Route path="/404" component={NotFound} />
                  </Switch>
                </MembershipContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </MemoryRouter>
      </MockApiProvider>
    )
  }
})
