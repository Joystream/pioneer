import { configure, render, screen } from '@testing-library/react'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { ApiContext } from '@/api/providers/context'
import { UseApi } from '@/api/providers/provider'
import { ConnectionStatusDot } from '@/app/components/ConnectionStatusDot'

configure({ testIdAttribute: 'id' })

let mockIndexerHead = 98

jest.mock('@/common/hooks/useQueryNode', () => ({
  useQueryNodeStateSubscription: () => ({
    queryNodeState: {
      indexerHead: mockIndexerHead,
    },
  }),
}))

describe('UI: Connection status component', () => {
  const useApi = {
    api: {},
    isConnected: false,
    connectionState: 'connecting',
    qnConnectionState: 'connecting',
  }
  set(useApi.api, 'rpc.chain.subscribeNewHeads', () => of({ number: 100 }))

  beforeEach(() => {
    mockIndexerHead = 98
    useApi.connectionState = 'connected'
    useApi.qnConnectionState = 'connected'
  })

  it('Connecting', () => {
    useApi.connectionState = 'connecting'
    useApi.qnConnectionState = 'connecting'

    renderComponent()

    expect(screen.getByTestId('connecting-dot')).toBeInTheDocument()
  })

  it('Connected', () => {
    renderComponent()

    expect(screen.getByTestId('connected-dot')).toBeInTheDocument()
  })

  it('QN far behind node warning', () => {
    mockIndexerHead = 50

    renderComponent()

    expect(screen.getByTestId('error-dot')).toBeInTheDocument()
  })

  it('QN connecting error', () => {
    useApi.qnConnectionState = 'error'

    renderComponent()

    expect(screen.getByTestId('error-dot')).toBeInTheDocument()
  })

  it('Node connecting error', () => {
    useApi.connectionState = 'disconnected'

    renderComponent()

    expect(screen.getByTestId('error-dot')).toBeInTheDocument()
  })

  function renderComponent() {
    return render(
      <ApiContext.Provider value={useApi as UseApi}>
        <ConnectionStatusDot />
      </ApiContext.Provider>
    )
  }
})
