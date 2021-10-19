import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { PastCouncils } from '@/app/pages/Council/PastCouncils'
import { seedElectedCouncil, seedMember } from '@/mocks/data'

import { mockCouncils, mockMembers } from '../../_mocks/council'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('Past Councils page', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    mockMembers.forEach((mockMember) => seedMember(mockMember, server.server))
    mockCouncils.forEach((mockCouncil) => seedElectedCouncil(mockCouncil, server.server))
  })

  it('Empty', async () => {
    renderPage()

    expect(screen.queryByText('There are no past councils')).toBeDefined()
  })

  function renderPage() {
    return render(
      <MockQueryNodeProviders>
        <MemoryRouter>
          <PastCouncils />
        </MemoryRouter>
      </MockQueryNodeProviders>
    )
  }
})
