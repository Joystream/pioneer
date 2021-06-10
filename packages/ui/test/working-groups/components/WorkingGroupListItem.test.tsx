import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { seedMembers, seedOpening, seedOpeningStatuses } from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { WorkingGroupListItem } from '@/working-groups/components/WorkingGroupListItem'
import { WorkingGroup } from '@/working-groups/types'

import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { OPENING_DATA } from '../../_mocks/server/seeds'

describe('WorkingGroupListItem', () => {
  const mockServer = setupMockServer()

  let group: WorkingGroup

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  beforeEach(() => {
    seedMembers(mockServer.server)
    seedWorkingGroups(mockServer.server)

    group = (mockServer.server?.schema.first('WorkingGroup')?.attrs as unknown) as WorkingGroup
  })

  it('Loading', () => {
    renderElement(group)

    expect(screen.getByText('-')).toBeDefined()
  })

  describe('Loaded', () => {
    it('Openings count', async () => {
      seedOpeningStatuses(mockServer.server)
      seedOpening(OPENING_DATA, mockServer.server)
      seedOpening(OPENING_DATA, mockServer.server)
      seedOpening({ ...OPENING_DATA, status: 'cancelled' }, mockServer.server)

      renderElement(group)

      await waitForElementToBeRemoved(() => screen.getByText('-'))

      expect(screen.getByText('2')).toBeDefined()
    })
  })

  function renderElement(group: WorkingGroup) {
    render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <WorkingGroupListItem group={group} />
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
