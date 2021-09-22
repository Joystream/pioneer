import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { CouncilTabs } from '@/app/pages/Council/components/CouncilTabs'
import { ApiContext } from '@/common/providers/api/context'

import { stubApi, stubCouncilAndReferendum } from '../../_mocks/transactions'

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

  it('Announcing', () => {
    stubCouncilAndReferendum(api, 'Election', 'Revealing')

    renderComponent()

    expect(screen.queryByText(/^Election$/i)).not.toBeNull()
  })

  function renderComponent() {
    return render(
      <ApiContext.Provider value={api}>
        <MemoryRouter>
          <CouncilTabs />
        </MemoryRouter>
      </ApiContext.Provider>
    )
  }
})
