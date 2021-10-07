import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { CKEditorProps } from '@/common/components/CKEditor'
import { ApiContext } from '@/common/providers/api/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { ProposalDiscussions } from '@/proposals/components/ProposalDiscussions'
import { ProposalDiscussionThread } from '@/proposals/types'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction } from '../../_mocks/transactions'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

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
    it('Non-whitelisted member', async () => {
      useMyMemberships.setActive(alice)
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111', '13'] })
      expect(
        await screen.findByText(
          'The discussion of this proposal is closed; only members whitelisted by the proposer can comment on it.'
        )
      ).toBeDefined()
    })

    it('Whitelisted member', async () => {
      useMyMemberships.setActive(alice)
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111', '13', '0'] })
      expect(
        screen.queryByText(
          'The discussion of this proposal is closed; only members whitelisted by the proposer can comment on it.'
        )
      ).toBeNull()
      expect(await getButton('Create post')).toBeDefined()
    })

    it('Whitelisted member not selected', async () => {
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111', '13', '0'] })
      expect(await screen.findByText('Please select a whitelisted membership to post in this thread.')).toBeDefined()
    })

    it('Council member', async () => {
      useMyMemberships.setActive({ ...alice, isCouncilMember: true })
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111'] })
      expect(
        screen.queryByText(
          'The discussion of this proposal is closed; only members whitelisted by the proposer can comment on it.'
        )
      ).toBeNull()
      expect(await getButton('Create post')).toBeDefined()
    })

    it('Council member not selected', async () => {
      useMyMemberships.members = [{ ...alice, isCouncilMember: true }]
      renderComponent({ ...baseThread, mode: 'closed', whitelistIds: ['111'] })
      expect(await screen.findByText('Please select your council membership to post in this thread.')).toBeDefined()
    })
  })

  describe('Thread mode: open', () => {
    it('Member selected', async () => {
      useMyMemberships.setActive(alice)
      renderComponent({ ...baseThread })
      expect(
        screen.queryByText(
          'The discussion of this proposal is closed; only members whitelisted by the proposer can comment on it.'
        )
      ).toBeNull()
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
