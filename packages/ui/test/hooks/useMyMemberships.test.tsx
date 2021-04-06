import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { Account } from '../../src/common/types'
import { useMyMemberships } from '../../src/hooks/useMyMemberships'
import { alice, bobStash } from '../mocks/keyring'
import { getMember } from '../mocks/members'
import { MockQueryNodeProviders } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'

const renderUseMembership = () => {
  return renderHook(() => useMyMemberships(), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
}

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../src/hooks/useAccounts', () => {
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
    mockServer.createMember('Alice')
    const aliceMember = getMember('Alice')
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
    mockServer.createMember('Bob')
    const bobMember = getMember('Bob')
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
    mockServer.createMember('Alice')
    const aliceMember = getMember('Alice')
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
