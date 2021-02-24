import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { expect } from '@jest/globals'
import { renderHook, act } from '@testing-library/react-hooks'
import { Server } from 'miragejs/server'
import React, { ReactNode } from 'react'
import { useMembership } from '../../src/hooks/useMembership'
import { makeServer } from '../../src/mocks/server'
import { aliceMember, createMember } from '../mocks/members'

describe('useMembership', () => {
  let server: Server

  beforeEach(() => {
    server = makeServer('test')
  })

  afterEach(() => {
    server.shutdown()
  })

  function renderUseMembership() {
    const link = new HttpLink({
      uri: '/query-node',
      fetch: (uri, options) => fetch(uri, options),
    })
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ApolloProvider client={new ApolloClient({ link, cache: new InMemoryCache() })}>{children}</ApolloProvider>
    )
    return renderHook(() => useMembership(), { wrapper })
  }

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
