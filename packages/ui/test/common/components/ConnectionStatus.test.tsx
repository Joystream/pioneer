import { act, configure, render, screen } from '@testing-library/react'
import EventEmitter from 'eventemitter3'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { Api } from '@/api'
import { ApiContext } from '@/api/providers/context'
import { UseApi } from '@/api/providers/provider'
import { ConnectionStatus } from '@/common/components/ConnectionStatus'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/hooks/useQueryNode', () => ({
  useQueryNodeStateSubscription: () => ({
    queryNodeState: undefined,
  }),
}))

describe('UI: Connection status component', () => {
  let eventEmitter: EventEmitter
  const useApi = {
    api: undefined,
    isConnected: false,
    connectionState: 'connecting',
  } as UseApi

  beforeEach(() => {
    eventEmitter = new EventEmitter()
    useApi.connectionState = 'connected'
    useApi.api = eventEmitter as unknown as Api
    set(useApi.api, 'api.rpc.chain.subscribeNewHeads', () => of(10))
  })

  jest.useFakeTimers()

  it('Disconnected', async () => {
    useApi.connectionState = 'connected'
    renderComponent()

    act(() => {
      eventEmitter.emit('connected')
      jest.runOnlyPendingTimers()
    })

    act(() => {
      useApi.connectionState = 'disconnected'
      eventEmitter.emit('disconnected')
    })

    expect(await screen.findByText(/^Disconnected from/i)).toBeDefined()
  })

  it('Auto-close', async () => {
    renderComponent()

    act(() => {
      eventEmitter.emit('disconnected')
    })

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(screen.queryByText(/connected/i)).toBeNull()
  })

  function renderComponent() {
    return render(
      <ApiContext.Provider value={useApi}>
        <ConnectionStatus />
      </ApiContext.Provider>
    )
  }
})
