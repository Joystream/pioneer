import { ApiRx } from '@polkadot/api'
import { act, fireEvent, render, screen } from '@testing-library/react'
import EventEmitter from 'eventemitter3'
import React from 'react'

import { ConnectionStatus } from '@/common/components/ConnectionStatus'
import { ApiContext } from '@/common/providers/api/context'
import { UseApi } from '@/common/providers/api/provider'

describe('UI: Connection status component', () => {
  let eventEmitter: EventEmitter
  const useApi = {
    api: {},
    isConnected: false,
    connectionState: 'connecting',
  } as UseApi

  beforeEach(() => {
    eventEmitter = new EventEmitter()
    useApi.connectionState = 'connected'
    useApi.api = (eventEmitter as unknown) as ApiRx
  })

  jest.useFakeTimers()

  it('Connecting', async () => {
    useApi.connectionState = 'connecting'

    renderComponent()

    expect(screen.getByText(/connecting to node/i)).toBeDefined()
  })

  it('Permanent Connecting', async () => {
    useApi.connectionState = 'connecting'

    renderComponent()

    act(() => {
      jest.advanceTimersByTime(5050)
    })

    expect(screen.getByText(/connecting to node/i)).toBeDefined()
  })

  it('Disconnected', async () => {
    renderComponent()

    act(() => {
      eventEmitter.emit('connected')
      useApi.connectionState = 'disconnected'
      eventEmitter.emit('disconnected')
    })

    expect(await screen.findByText(/^Disconnected from/i)).toBeDefined()
  })

  it('Connected', async () => {
    renderComponent()

    act(() => {
      eventEmitter.emit('connected')
    })

    expect(await screen.findByText(/^Connected to/i)).toBeDefined()
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

  it('Close permanently', async () => {
    renderComponent()

    act(() => {
      eventEmitter.emit('disconnected')
    })

    fireEvent.click(await screen.findByRole('button'))

    act(() => {
      eventEmitter.emit('disconnected')
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
