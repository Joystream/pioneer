import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { UseAccounts } from '../../../src/accounts/providers/accounts/provider'
import { useMyMemberships } from '../../../src/memberships/hooks/useMyMemberships'
import { seedMembers } from '../../../src/mocks/data'
import { alice, bobStash } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const renderUseMembership = () => {
  return renderHook(() => useMyMemberships(), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
}

const useAccounts: UseAccounts = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../../src/accounts/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

describe('useMyMemberships', () => {
  const mockServer = setupMockServer()

  afterEach(() => {
    useAccounts.hasAccounts = false
    useAccounts.allAccounts.splice(0)
  })

  it('Returns loading state', () => {
    const { result } = renderUseMembership()

    expect(result.current).toMatchObject({
      active: undefined,
      count: 0,
      isLoading: true,
      members: [],
    })
  })

  it('No matches returns empty state', async () => {
    const { result, waitForNextUpdate } = renderUseMembership()

    await waitForNextUpdate()

    expect(result.current).toMatchObject({
      active: undefined,
      count: 0,
      isLoading: false,
      members: [],
    })
  })

  it('Matched rootAccount', async () => {
    seedMembers(mockServer.server)
    const aliceMember = getMember('alice')
    useAccounts.hasAccounts = true
    useAccounts.allAccounts.push(alice)

    const { result, waitForNextUpdate } = renderUseMembership()
    await waitForNextUpdate()

    expect(result.current).toMatchObject({
      active: undefined,
      count: 1,
      isLoading: false,
      members: [aliceMember],
    })
  })

  it('Matched controllerAccount', async () => {
    seedMembers(mockServer.server)
    const bobMember = getMember('bob')
    useAccounts.hasAccounts = true
    useAccounts.allAccounts.push(bobStash)

    const { result, waitForNextUpdate } = renderUseMembership()
    await waitForNextUpdate()

    expect(result.current).toMatchObject({
      active: undefined,
      count: 1,
      isLoading: false,
      members: [bobMember],
    })
  })

  it('Allows to set active member', async () => {
    seedMembers(mockServer.server)
    const aliceMember = getMember('alice')
    useAccounts.hasAccounts = true
    useAccounts.allAccounts.push(alice)

    const { result, waitForNextUpdate } = renderUseMembership()
    await waitForNextUpdate()

    const { setActive, members } = result.current
    act(() => setActive(members[0]))

    expect(result.current).toMatchObject({
      active: aliceMember,
      count: 1,
      isLoading: false,
      members: [aliceMember],
    })
  })
})
