import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { Council } from '@/app/pages/Council/Council'
import { seedCouncilMember, seedMember, seedElectedCouncils } from '@/mocks/data'

import { mockMembers, mockCouncils, mockCouncilors } from '../../_mocks/council'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { loaderSelector } from '../../setup'

describe('Council page', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    mockMembers.forEach((mockMember) => seedMember(mockMember, server.server))
    seedElectedCouncils(server.server, mockCouncils)
  })

  it('Empty state', async () => {
    renderPage()

    await waitForElementToBeRemoved(() => loaderSelector())

    expect(screen.queryByText('There is no council member at the moment')).toBeInTheDocument()
  })

  it('Default', async () => {
    mockCouncilors.forEach((mockCouncilor) => seedCouncilMember(mockCouncilor, server.server))

    renderPage()

    await waitForElementToBeRemoved(() => loaderSelector())

    expect(await screen.findByText('Council member A')).toBeDefined()
    expect(screen.queryByText('Council member B')).toBeNull()
    expect(screen.queryByText('Council member C')).toBeNull()
    expect(screen.queryByText('Council member D')).toBeNull()
    expect(screen.queryByText('Council member E')).toBeNull()
    expect(await screen.findByText('Council member F')).toBeDefined()
    expect(await screen.findByText('Council member G')).toBeDefined()
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
