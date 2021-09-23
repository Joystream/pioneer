import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { Council } from '@/app/pages/Council/Council'
import { seedElectedCouncil, seedCouncilMember, seedMember } from '@/mocks/data'

import { mockMembers, mockCouncils, mockCouncilors } from '../../_mocks/council'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('Council page', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    mockMembers.forEach((mockMember) => seedMember(mockMember, server.server))
    mockCouncils.forEach((mockCouncil) => seedElectedCouncil(mockCouncil, server.server))
  })

  it('Empty state', async () => {
    renderPage()

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    expect(screen.queryByText('There is no council member at the moment')).toBeDefined()
  })

  it('Default', async () => {
    mockCouncilors.forEach((mockCouncilor) => seedCouncilMember(mockCouncilor, server.server))

    renderPage()

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    expect(screen.queryByText('Council member A')).toBeDefined()
    expect(screen.queryByText('Council member B')).toBeNull()
    expect(screen.queryByText('Council member C')).toBeNull()
    expect(screen.queryByText('Council member D')).toBeNull()
    expect(screen.queryByText('Council member E')).toBeNull()
    expect(screen.queryByText('Council member F')).toBeDefined()
    expect(screen.queryByText('Council member G')).toBeDefined()
  })

  function renderPage() {
    return render(
      <MockQueryNodeProviders>
        <MemoryRouter>
          <Council />
        </MemoryRouter>
      </MockQueryNodeProviders>
    )
  }
})
