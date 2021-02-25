import { expect } from '@jest/globals'
import { act, renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs/server'
import React from 'react'
import { useMembership } from '../../src/hooks/useMembership'
import { makeServer } from '../../src/mocks/server'
import { MockQueryNodeProviders } from '../helpers/providers'
import { aliceMember, createMember } from '../mocks/members'

const renderUseMembership = () => {
  return renderHook(() => useMembership(), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
}

describe('useMembership', () => {
  let server: Server

  beforeEach(() => {
    server = makeServer('test')
  })

  afterEach(() => {
    server.shutdown()
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

  it('Returns matched members', async () => {
    createMember(server, aliceMember)

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
    createMember(server, aliceMember)
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
