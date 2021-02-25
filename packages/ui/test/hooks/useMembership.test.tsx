import { expect } from '@jest/globals'
import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { useMembership } from '../../src/hooks/useMembership'
import { MockQueryNodeProviders } from '../helpers/providers'
import { getMember } from '../mocks/members'
import { setupMockServer } from '../mocks/server'

const renderUseMembership = () => {
  return renderHook(() => useMembership(), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
}

describe('useMembership', () => {
  const mockServer = setupMockServer()

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
