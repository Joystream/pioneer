import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'

import { ProposalPreview } from '@/app/pages/Proposals/ProposalPreview'
import { CKEditorProps } from '@/common/components/CKEditor'
import { seedMember, seedProposal } from '@/mocks/data'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { MockApiProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA, PROPOSAL_DATA } from '../../_mocks/server/seeds'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('ProposalPreview', () => {
  const mockServer = setupMockServer()

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    seedMember(MEMBER_ALICE_DATA, mockServer.server)
    seedProposal(PROPOSAL_DATA, mockServer.server)
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

    expect(await screen.findByText('Update Working Group Budget')).toBeDefined()

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

  function renderPage() {
    const history = createMemoryHistory()
    history.push(`${ProposalsRoutes.preview}/0`)

    render(
      <MockApiProvider>
        <Router history={history}>
          <MockQueryNodeProviders>
            <Route path={`${ProposalsRoutes.preview}/:id`}>
              <ProposalPreview />
            </Route>
          </MockQueryNodeProviders>
        </Router>
      </MockApiProvider>
    )
  }
})
