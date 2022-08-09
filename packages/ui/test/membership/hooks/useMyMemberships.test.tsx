import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { seedMembers } from '@/mocks/data'

import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts } from '../../_mocks/transactions'

const renderUseMembership = () => {
  return renderHook(() => useMyMemberships(), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
}

describe('useMyMemberships', () => {
  const mockServer = setupMockServer()

  beforeEach(() => {
    stubAccounts([])
  })

  it('Returns loading state', () => {
    stubAccounts([], { isLoading: true })

    const { result } = renderUseMembership()

    expect(result.current).toMatchObject({
      active: undefined,
      isLoading: true,
      members: [],
      hasMembers: false,
    })
  })

  it('No matches returns empty state', async () => {
    const { result } = renderUseMembership()

    expect(result.current).toMatchObject({
      active: undefined,
      isLoading: false,
      members: [],
      hasMembers: false,
    })
  })

  it('Matched rootAccount', async () => {
    seedMembers(mockServer.server, 2)
    const aliceMember = getMember('alice')
    stubAccounts([alice, aliceStash])

    const { result, waitForNextUpdate } = renderUseMembership()
    await waitForNextUpdate()

    expect(result.current).toMatchObject({
      active: undefined,
      isLoading: false,
      members: [aliceMember],
      hasMembers: true,
    })
  })

  it('Matched controllerAccount', async () => {
    seedMembers(mockServer.server, 2)
    const bobMember = getMember('bob')
    stubAccounts([bob, bobStash])

    const { result, waitForNextUpdate } = renderUseMembership()
    await waitForNextUpdate()

    expect(result.current).toMatchObject({
      active: undefined,
      isLoading: false,
      members: [bobMember],
      hasMembers: true,
    })
  })

  it('Allows to set active member', async () => {
    seedMembers(mockServer.server, 2)
    const aliceMember = getMember('alice')
    stubAccounts([alice, aliceStash])

    const { result, waitForNextUpdate } = renderUseMembership()
    await waitForNextUpdate()

    const { setActive, members } = result.current
    act(() => setActive(members[0]))

    expect(result.current).toMatchObject({
      active: aliceMember,
      isLoading: false,
      members: [aliceMember],
      hasMembers: true,
    })
  })
})
