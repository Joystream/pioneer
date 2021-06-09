import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { startOfToday, subDays } from 'date-fns'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers, seedOpening, seedOpeningStatuses } from '@/mocks/data'
import { seedApplications } from '@/mocks/data/mockApplications'
import { seedOpenings } from '@/mocks/data/mockOpenings'
import { seedRewardPaidEvent } from '@/mocks/data/mockRewardPaidEvents'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { seedWorkers } from '@/mocks/data/seedWorkers'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { WorkingGroupListItem } from '@/working-groups/components/WorkingGroupListItem'
import { WorkingGroupFieldsFragment } from '@/working-groups/queries'
import { asWorkingGroup, WorkingGroup } from '@/working-groups/types'

import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
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

    expect(1).toBe(1)
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
