import { screen, render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { WorkingGroupsTabs } from '@/app/pages/WorkingGroups/components/WorkingGroupsTabs'
import { MembershipContext } from '@/memberships/providers/membership/context'

describe('WorkingGroupsTabs', () => {
  it('Without a membership', () => {
    renderTabs(false)
    expect(screen.getByText('Openings')).toBeDefined()
    expect(screen.getByText('Working Groups')).toBeDefined()
    expect(screen.queryByText('My Applications')).toBeNull()
    expect(screen.queryByText('My Roles')).toBeNull()
  })

  it('With a membership', () => {
    renderTabs(true)
    expect(screen.getByText('Openings')).toBeDefined()
    expect(screen.getByText('Working Groups')).toBeDefined()
    expect(screen.getByText('My Applications')).toBeDefined()
    expect(screen.getByText('My Roles')).toBeDefined()
  })

  function renderTabs(hasMembers: boolean) {
    render(
      <MemoryRouter>
        <MembershipContext.Provider
          value={{
            active: undefined,
            setActive: () => null,
            members: [],
            isLoading: false,
            hasMembers,
            helpers: {
              getMemberIdByBoundAccountAddress: () => undefined,
            },
          }}
        >
          <WorkingGroupsTabs />
        </MembershipContext.Provider>
      </MemoryRouter>
    )
  }
})
