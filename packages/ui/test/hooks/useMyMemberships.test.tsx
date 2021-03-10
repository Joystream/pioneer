import { expect } from '@jest/globals'
import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { useMyMemberships } from '../../src/hooks/useMyMemberships'
import { MockQueryNodeProviders } from '../helpers/providers'
import { getMember } from '../mocks/members'
import { setupMockServer } from '../mocks/server'

const renderUseMembership = () => {
  return renderHook(() => useMyMemberships(), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
}

const useAccounts = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

describe.skip('useMyMemberships', () => {
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
    const { result, rerender } = renderUseMembership()

    act(() => {
      useAccounts.hasAccounts = true
      rerender()
    })

    expect(result.current).toMatchObject({
      active: undefined,
      count: 0,
      isLoading: false,
      members: [],
    })
  })

  it('Returns matched members', async () => {
    await mockServer.createMember('Alice')
    const aliceMember = await getMember('Alice')

    const { result, waitForNextUpdate } = renderUseMembership()
    await waitForNextUpdate()

    expect(result.current).toMatchObject({
      active: undefined,
      count: 1,
      isLoading: false,
      members: [aliceMember],
    })
  })

  it('Allows to set active member', async () => {
    await mockServer.createMember('Alice')
    const aliceMember = await getMember('Alice')

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
