import { Server } from 'miragejs'

import { fixAssociations, makeServer } from '@/mocks/server'

interface MockServer {
  server?: Server
}

export function setupMockServer(): MockServer {
  const mock: MockServer = {}

  beforeEach(() => {
    mock.server = makeServer('test')
    fixAssociations(mock.server as unknown as any)
  })

  afterEach(() => {
    mock?.server?.shutdown()
  })

  return mock
}
