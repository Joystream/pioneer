import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ApiContext } from '@/api/providers/context'
import { CKEditorProps } from '@/common/components/CKEditor'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { ProposalDiscussions } from '@/proposals/components/ProposalDiscussions'
import { ProposalDiscussionThread } from '@/proposals/types'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction } from '../../_mocks/transactions'

jest.mock('@/common/components/CKEditor', () => {
  return {
    BaseCKEditor: (props: CKEditorProps) => mockCKEditor(props),
  }
})

const strings = {
  isClosed: 'The discussion is limited to following whitelisted members:',
  selectCouncilor: 'Please select your council membership to post in this thread.',
  selectWhitelisted: 'Please select your other membership to post in this thread:',
}

describe('UI: Proposal discussion', () => {
  const api = stubApi()
  stubTransaction(api, 'api.tx.proposalsDiscussion.addPost')

  const alice = getMember('alice')
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [alice],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const baseThread: ProposalDiscussionThread = {
    id: '1',
    discussionPosts: [],
    mode: 'open',
  }

  beforeEach(() => {
    useMyMemberships.active = undefined
    useMyMemberships.members = [alice]
  })

  describe('Thread mode: closed', () => {
    const councillor = { ...alice, isCouncilMember: true, id: '1337' }

    it('Non-whitelisted member', async () => {
      useMyMemberships.setActive(alice)
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111', '13'] })
      expect(await screen.queryByText(/${strings.isClosed}/i)).toBeDefined()
    })

    it('Whitelisted member', async () => {
      useMyMemberships.setActive(alice)
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111', '13', '0'] })
      expect(await screen.queryByText(/${strings.isClosed}/i)).toBeNull()
      expect(await screen.queryByText(strings.selectCouncilor)).toBeNull()
      expect(await getButton('Create post')).toBeDefined()
    })

    it('Whitelisted member not selected', async () => {
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111', '13', '0'] })
      expect(await screen.queryByText(/${strings.isClosed}/i)).toBeNull()
      expect(await screen.queryByText(/${strings.selectWhitelisted}/i)).toBeDefined()
    })

    it('Council member', async () => {
      useMyMemberships.setActive(councillor)
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111'] })
      expect(screen.queryByText(/${strings.isClosed}/i)).toBeNull()
      expect(screen.queryByText(strings.selectCouncilor)).toBeNull()
      expect(await getButton('Create post')).toBeDefined()
    })

    it('Council member not selected', async () => {
      useMyMemberships.members = [councillor]
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111'] })
      expect(await screen.findByText(strings.selectCouncilor)).toBeDefined()
    })

    describe('User has both a council and a whitelisted membership', () => {
      it('Council member selected', async () => {
        useMyMemberships.members = [alice, councillor]
        useMyMemberships.setActive(councillor)
        renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['0'] })
        expect(screen.queryByText(/${strings.isClosed}/i)).toBeNull()
        expect(screen.queryByText(strings.selectCouncilor)).toBeNull()
        expect(await getButton('Create post')).toBeDefined()
      })

      it('Whitelisted member selected', async () => {
        useMyMemberships.members = [alice, councillor]
        useMyMemberships.setActive(alice)
        renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['0'] })
        expect(screen.queryByText(strings.isClosed)).toBeNull()
        expect(screen.queryByText(strings.selectCouncilor)).toBeNull()
        expect(await getButton('Create post')).toBeDefined()
      })

      it('Neither member selected', async () => {
        useMyMemberships.members = [alice, councillor]
        renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['0'] })
        expect(screen.queryByText(/${strings.isClosed}/i)).toBeNull()
        expect(await screen.findByText(strings.selectCouncilor)).toBeDefined()
        expect(screen.queryByText('Create post')).toBeNull()
      })
    })
  })

  describe('Thread mode: open', () => {
    it('Member selected', async () => {
      useMyMemberships.setActive(alice)
      renderComponent({ ...baseThread })
      expect(screen.queryByText(/${strings.isClosed}/i)).toBeNull()
      expect(await getButton('Create post')).toBeDefined()
    })

    it('Member not selected', async () => {
      renderComponent({ ...baseThread })
      expect(screen.queryByText(/Pick an active membership to post in this thread/i)).toBeDefined()
      expect(screen.queryByText('Create post')).toBeNull()
    })
  })

  const renderComponent = (thread: ProposalDiscussionThread) =>
    render(
      <MemoryRouter>
        <MockKeyringProvider>
          <MembershipContext.Provider value={useMyMemberships}>
            <ApiContext.Provider value={api}>
              <ProposalDiscussions thread={thread} proposalId="1" />
            </ApiContext.Provider>
          </MembershipContext.Provider>
        </MockKeyringProvider>
      </MemoryRouter>
    )
})
