import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { Election } from '@/app/pages/Council/Election'
import { ApiContext } from '@/common/providers/api/context'

import { stubApi, stubCouncilAndReferendum } from '../../_mocks/transactions'

describe('UI: Election page', () => {
  const api = stubApi()

  it('Inactive', () => {
    stubCouncilAndReferendum(api, 'Idle', 'Inactive')

    renderComponent()

    expect(screen.queryByText('Stage')).toBeNull()
  })

  it('Announcing', () => {
    stubCouncilAndReferendum(api, 'Announcing', 'Inactive')

    renderComponent()

    expect(screen.queryByText(/Announcing period/i)).not.toBeNull()
  })

  it('Voting', () => {
    stubCouncilAndReferendum(api, 'Election', 'Voting')

    renderComponent()

    expect(screen.queryByText(/Voting period/i)).not.toBeNull()
  })

  it('Revealing', () => {
    stubCouncilAndReferendum(api, 'Election', 'Revealing')

    renderComponent()

    expect(screen.queryByText(/Revealing period/i)).not.toBeNull()
  })

  function renderComponent() {
    return render(
      <ApiContext.Provider value={api}>
        <MemoryRouter>
          <Election />
        </MemoryRouter>
      </ApiContext.Provider>
    )
  }
})
