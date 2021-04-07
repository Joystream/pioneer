import { ApiRx } from '@polkadot/api'
import { act, fireEvent, render, screen } from '@testing-library/react'
import EventEmitter from 'eventemitter3'
import React from 'react'

import { ConnectionStatus } from '../../../src/common/components/ConnectionStatus'
import { ApiContext } from '../../../src/common/providers/api/context'
import { UseApi } from '../../../src/common/providers/api/provider'

describe('UI: Connection status component', () => {
  let eventEmitter: EventEmitter
  const useApi = {
    api: {},
    isConnected: false,
  } as UseApi

  beforeEach(() => {
    eventEmitter = new EventEmitter()
    useApi.isConnected = false
    useApi.api = (eventEmitter as unknown) as ApiRx
  })

  jest.useFakeTimers()

  it('Default state', async () => {
    renderComponent()

    expect(screen.queryByText(/connected/i)).toBeNull()
  })

  it('Disconnected', async () => {
    renderComponent()

    act(() => {
      eventEmitter.emit('disconnected')
    })

    expect(await screen.findByText('Disconnected from network')).toBeDefined()
  })

  it('Connected', async () => {
    renderComponent()
    useApi.isConnected = true

    act(() => {
      eventEmitter.emit('connected')
    })

    expect(await screen.findByText('Connected to network')).toBeDefined()
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
