import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { ElectionTabs } from '@/app/pages/Election/components/ElectionTabs'
import { LocalStorageKey } from '@/council/hooks/useElectionStatusChanged'

import { stubApi, stubCouncilAndReferendum } from '../../_mocks/transactions'

const CHILD_NODES_WITH_INDICATOR = 4

const expectHasChanges = async () => {
  const electionTab = await screen.findByText(/^Election/i)
  expect(electionTab.childNodes.length === CHILD_NODES_WITH_INDICATOR).toBeTruthy()
}

const expectHasNoChanges = async () => {
  const electionTab = await screen.findByText(/^Election/i)
  expect(electionTab.childNodes.length < CHILD_NODES_WITH_INDICATOR).toBeTruthy()
}

describe('CouncilTabs', () => {
  const api = stubApi()

  it('Inactive', () => {
    stubCouncilAndReferendum(api, 'Idle', 'Inactive')

    renderComponent()

    expect(screen.queryByText(/^Election$/i)).toBeNull()
  })

  it('Announcing', () => {
    stubCouncilAndReferendum(api, 'Announcing', 'Inactive')

    renderComponent()

    expect(screen.queryByText(/^Election$/i)).not.toBeNull()
  })

  it('Voting', () => {
    stubCouncilAndReferendum(api, 'Election', 'Voting')

    renderComponent()

    expect(screen.queryByText(/^Election$/i)).not.toBeNull()
  })

  it('Revealing', () => {
    stubCouncilAndReferendum(api, 'Election', 'Revealing')

    renderComponent()

    expect(screen.queryByText(/^Election$/i)).not.toBeNull()
  })

  describe('Election indicator', () => {
    beforeEach(() => {
      window.localStorage.clear()
    })

    it('New voting period', async () => {
      window.localStorage.setItem(LocalStorageKey, JSON.stringify('inactive'))
      stubCouncilAndReferendum(api, 'Announcing', 'Inactive')

      renderComponent()

      await expectHasChanges()
    })

    it('Same voting period (Announcing)', async () => {
      window.localStorage.setItem(LocalStorageKey, JSON.stringify('announcing'))
      stubCouncilAndReferendum(api, 'Announcing', 'Inactive')

      renderComponent()

      await expectHasNoChanges()
    })

    it('Same voting period (Revealing)', async () => {
      window.localStorage.setItem(LocalStorageKey, JSON.stringify('revealing'))
      stubCouncilAndReferendum(api, 'Election', 'Revealing')

      renderComponent()

      await expectHasNoChanges()
    })
  })

  function renderComponent() {
    return render(
      <ApiContext.Provider value={api}>
        <MemoryRouter>
          <ElectionTabs />
        </MemoryRouter>
      </ApiContext.Provider>
    )
  }
})
