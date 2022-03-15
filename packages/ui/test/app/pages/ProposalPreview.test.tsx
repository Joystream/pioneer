import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'

import { ProposalPreview } from '@/app/pages/Proposals/ProposalPreview'
import { CKEditorProps } from '@/common/components/CKEditor'
import { ApiContext } from '@/common/providers/api/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers, seedProposal } from '@/mocks/data'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA, PROPOSAL_DATA } from '../../_mocks/server/seeds'
import { stubApi, stubProposalConstants, stubQuery } from '../../_mocks/transactions'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

jest.mock('@/proposals/hooks/useProposalConstants', () => ({
  useProposalConstants: () => null,
}))

describe('ProposalPreview', () => {
  const mockServer = setupMockServer()
  const api = stubApi()
  const useMyMemberships: MyMemberships = {
    active: getMember('alice'),
    members: [getMember('alice')],
    setActive: (member) => {
      useMyMemberships.active = member
    },
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    stubProposalConstants(api)
    seedMembers(mockServer.server, 2)
    seedProposal(PROPOSAL_DATA, mockServer.server)
    stubQuery(api, 'council.councilMembers', [])
    stubQuery(api, 'proposalsEngine.voteExistsByProposalByVoter.size', createType('u64', 0))
  })

  it('Loading', async () => {
    renderPage()

    expect(await screen.findByText('Loading...')).toBeDefined()
  })

  it('Main content', async () => {
    renderPage()

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    expect(await screen.findByText(PROPOSAL_DATA.title, { selector: 'h2' })).toBeDefined()

    expect(await screen.findByText('Deciding')).toBeDefined()

    expect(await screen.findAllByText(/(?:Approval|Slashing) (?:Quorum|Threshold)/)).toHaveLength(4)

    expect(await screen.findByText('Set Membership Price')).toBeDefined()

    expect(await screen.findByText('Rationale')).toBeDefined()

    expect(await screen.findByText('Discussion')).toBeDefined()
  })

  it('Sidebar', async () => {
    renderPage()

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    const sideBar = await screen.findByRole('complementary')
    expect(sideBar).toBeDefined()

    const proposerSection = (await within(sideBar).findByText('Proposer')).parentElement as HTMLElement
    expect(proposerSection).toBeDefined()
    expect(await within(proposerSection).findByText(MEMBER_ALICE_DATA.handle)).toBeDefined()

    expect(await within(sideBar).findByText('History')).toBeDefined()

    for (const name of ['Approved', 'Rejected', 'Slashed', 'Abstained', 'Not Voted']) {
      expect(await within(sideBar).findByText(name)).toBeDefined()
    }
  })

  describe('Vote button', () => {
    it('Member is not a council member', () => {
      renderPage()
      expect(screen.queryByText(/Vote on Proposal/i)).toBeNull()
      expect(screen.queryByText(/Already voted/i)).toBeNull()
    })

    describe('Member is a council member', () => {
      beforeEach(() => {
        stubQuery(api, 'council.councilMembers', [{ membership_id: createType('MemberId', 0) }])
      })

      it('Member has not voted yet', async () => {
        renderPage()
        expect(await screen.findByText(/Vote on Proposal/i)).toBeDefined()
      })

      it('Member has already voted', async () => {
        stubQuery(api, 'proposalsEngine.voteExistsByProposalByVoter.size', createType('u64', 16))
        renderPage()
        expect(await screen.findByText(/Already voted/i)).toBeDefined()
      })
    })
  })

  describe('"You voted for" section', () => {
    beforeEach(() => {
      stubQuery(api, 'council.councilMembers', [{ membership_id: createType('MemberId', 0) }])
    })

    it('No vote cast', () => {
      renderPage()
      expect(screen.queryByText(/You voted for:/i)).toBeNull()
    })

    it('Voted for rejecting', async () => {
      seedProposal(
        {
          ...PROPOSAL_DATA,
          votes: [
            {
              id: '0',
              voteKind: 'REJECT',
              network: 'OLYMPIA',
              createdAt: '2021-10-21T11:21:59.812Z',
              inBlock: 100,
              voterId: '0',
              rationale: '',
              votingRound: 0,
            },
          ],
        },
        mockServer.server
      )

      renderPage()

      expect((await screen.findByText(/You voted for:/i)).textContent).toEqual('You voted for: Rejected')
    })
  })

  function renderPage() {
    const history = createMemoryHistory()
    history.push(`${ProposalsRoutes.preview}/0`)

    render(
      <ApiContext.Provider value={api}>
        <Router history={history}>
          <MockQueryNodeProviders>
            <Route path={`${ProposalsRoutes.preview}/:id`}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ProposalPreview />
              </MembershipContext.Provider>
            </Route>
          </MockQueryNodeProviders>
        </Router>
      </ApiContext.Provider>
    )
  }
})
