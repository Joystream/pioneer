import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { GlobalModals } from '@/app/GlobalModals'
import { Members } from '@/app/pages/Members/Members'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { repeat } from '@/common/utils'
import { seedMembers, mockMembers } from '@/mocks/data'
import { seedApplications } from '@/mocks/data/seedApplications'
import { seedOpenings } from '@/mocks/data/seedOpenings'
import { seedWorkers } from '@/mocks/data/seedWorkers'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'

import { MockApiProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const seededMembers = mockMembers.slice(0, 10)

jest.mock('@/common/hooks/useModal', () => ({
  useModal: jest.requireActual('@/common/hooks/useModal').useModal,
}))

describe('Members', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(cryptoWaitReady)

  beforeAll(() => {
    seedMembers(server.server, 10)
    seedWorkingGroups(server.server)
    seedOpenings(server.server)
    seedApplications(
      server.server,
      repeat((i) => ({ applicantId: String(i) }), 10)
    )
    seedWorkers(
      server.server,
      repeat((i) => ({ membershipId: i, applicationId: `forumWorkingGroup-${i}` }), 10)
    )
  })

  it('Renders the page', async () => {
    const membersCount = seededMembers.length

    renderPage()

    expect(await screen.findByText(/all members/i)).toBeDefined()
    expect(await screen.findByText(membersCount)).toBeDefined()
  })

  it('Filter: only verified', async () => {
    const membersCount = seededMembers.filter((member) => member.isVerified).length

    renderPage()

    await clickIsVerifiedMember()

    expect(await screen.findByText(/all members/i)).toBeDefined()
    expect(await screen.findByText(membersCount)).toBeDefined()
  })

  it('Filter: only founder', async () => {
    const membersCount = seededMembers.filter((member) => member.isFoundingMember).length

    renderPage()
    await clickIsFoundingMember()

    expect(await screen.findByText(/all members/i)).toBeDefined()
    expect(await screen.findByText(membersCount)).toBeDefined()
  })

  it('Filter: founder and verified', async () => {
    const membersCount = seededMembers.filter((member) => member.isFoundingMember && member.isVerified).length

    renderPage()

    await clickIsFoundingMember()
    await clickIsVerifiedMember()

    expect(await screen.findByText(/all members/i)).toBeDefined()
    expect(await screen.findByText(membersCount)).toBeDefined()
  })

  it('Renders the page with Member Profile', async () => {
    renderPage('/members/1')
    expect(await screen.findByText(/profile/i)).toBeDefined()
    expect(await screen.findByText(/Member Details/i)).toBeDefined()
    expect(await screen.findByText(/Member Name/i)).toBeDefined()
    expect(
      await screen.getByRole('heading', {
        name: /member id/i,
      })
    ).toBeDefined()
  })

  async function clickIsVerifiedMember() {
    const isVerifiedMemberCheckbox = (await screen.findByText(/member type/i)).parentElement?.children[1]
    act(() => {
      fireEvent.click(isVerifiedMemberCheckbox as Element)
    })
  }

  async function clickIsFoundingMember() {
    const isFoundingMemberCheckbox = (await screen.findByText(/member type/i)).parentElement?.children[2]
    act(() => {
      fireEvent.click(isFoundingMemberCheckbox as Element)
    })
  }

  function renderPage(path = '/members/') {
    const history = createMemoryHistory()
    history.push(path)

    render(
      <MockApiProvider>
        <Router history={history}>
          <ModalContextProvider>
            <MockQueryNodeProviders>
              <Switch>
                <Route path="/members/:id" component={Members} />
                <Route path="/members/" component={Members} />
              </Switch>
              <GlobalModals />
            </MockQueryNodeProviders>
          </ModalContextProvider>
        </Router>
      </MockApiProvider>
    )
  }
})
