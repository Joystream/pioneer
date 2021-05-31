import { screen, render } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { UseMyEarnings } from '@/working-groups/hooks/useMyEarnings'

let mockEarnings: UseMyEarnings

jest.mock('../../../src/working-groups/hooks/useMyEarnings', () => {
  return {
    useMyEarnings: () => mockEarnings,
  }
})

describe('MyEarningsStat', () => {
  beforeEach(() => {
    mockEarnings = {
      last24hours: null,
      month: null,
    }
  })

  it('Loading', () => {
    renderStat()

    expect(screen.getAllByText('-').length).toBe(2)
  })

  it('Loaded', () => {
    mockEarnings = {
      last24hours: new BN(110),
      month: new BN(10000),
    }
    renderStat()

    expect(screen.getByText('110')).toBeDefined()
    expect(screen.getByText('10,000')).toBeDefined()
  })

  function renderStat() {
    render(
      <MemoryRouter>
        <MembershipContext.Provider
          value={{
            active: undefined,
            setActive: () => null,
            members: [],
            isLoading: false,
            hasMembers: false,
          }}
        >
          <MyEarningsStat />
        </MembershipContext.Provider>
      </MemoryRouter>
    )
  }
})
